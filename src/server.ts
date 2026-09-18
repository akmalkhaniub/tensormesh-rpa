import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { UIGroundingEngine, type DetectedElement } from './ui_grounding_engine.js';
import { ActionPlanner } from './action_planner.js';
import { GPUBenchmarker } from './gpu_benchmarker.js';
import { NebiusNvidiaClient } from './nebius_nvidia_client.js';
import { resolveSafePath, readJsonBody } from './util.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const PUBLIC_DIR = path.join(__dirname, 'public');

const MIME_TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml'
};

const DETECTED_ELEMENTS: DetectedElement[] = [
  { label: 'Customer Search Input', bbox: [100, 450, 140, 850], type: 'INPUT' },
  { label: 'Export Report Button', bbox: [900, 1600, 940, 1820], type: 'BUTTON' },
  { label: 'Sales Data Grid', bbox: [200, 100, 850, 1850], type: 'TABLE' }
];

const sendJson = (res: http.ServerResponse, status: number, payload: unknown): void => {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(payload));
};

/** Build the TensorMesh RPA server without binding a port (testable). */
export function createTensorMeshServer(): { server: http.Server; grounding: UIGroundingEngine; planner: ActionPlanner } {
  const grounding = new UIGroundingEngine({ screenWidth: 1920, screenHeight: 1080 });
  const planner = new ActionPlanner(grounding);

  const server = http.createServer(async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }

    try {
      if (req.url === '/api/health' && req.method === 'GET') {
        const probe = new NebiusNvidiaClient();
        return sendJson(res, 200, { status: 'online', service: 'TensorMesh RPA', timestamp: new Date().toISOString(), inferenceMode: probe.isMock ? 'simulator' : 'live' });
      }

      if (req.url === '/api/plan' && req.method === 'POST') {
        const { prompt, engine } = await readJsonBody(req);
        if (!prompt || typeof prompt !== 'string') return sendJson(res, 400, { error: 'A non-empty "prompt" is required.' });
        const client = new NebiusNvidiaClient({ preferredEngine: engine === 'nvidia' ? 'nvidia' : 'nebius' });
        const plan = await client.planRpaSequence(prompt, DETECTED_ELEMENTS);
        return sendJson(res, 200, { plan, elements: DETECTED_ELEMENTS });
      }

      if (req.url === '/api/benchmark' && req.method === 'GET') {
        return sendJson(res, 200, GPUBenchmarker.runBenchmark());
      }

      const filePath = resolveSafePath(PUBLIC_DIR, req.url);
      if (!filePath) {
        res.writeHead(403, { 'Content-Type': 'text/plain' });
        res.end('403 Forbidden');
        return;
      }
      const ext = path.extname(filePath).toLowerCase();
      fs.readFile(filePath, (err, content) => {
        if (err) {
          const code = (err as NodeJS.ErrnoException).code === 'ENOENT' ? 404 : 500;
          res.writeHead(code, { 'Content-Type': 'text/plain' });
          res.end(code === 404 ? '404 Not Found' : 'Server Error');
        } else {
          res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
          res.end(content);
        }
      });
    } catch (err) {
      const e = err as Error & { statusCode?: number };
      sendJson(res, e.statusCode || 400, { error: e.message });
    }
  });

  return { server, grounding, planner };
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === __filename;
if (isMain) {
  const PORT = process.env.PORT || 3004;
  const { server } = createTensorMeshServer();
  server.listen(PORT, () => {
    console.log(`⚡ TensorMesh RPA Server running at http://localhost:${PORT}`);
    console.log(`📋 Health: http://localhost:${PORT}/api/health`);
  });
  const shutdown = (signal: string) => {
    console.log(`\n🛑 Received ${signal}, shutting down gracefully...`);
    server.close(() => process.exit(0));
    setTimeout(() => process.exit(0), 5000).unref();
  };
  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}
