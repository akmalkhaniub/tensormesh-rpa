import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { UIGroundingEngine } from './ui_grounding_engine.js';
import { ActionPlanner } from './action_planner.js';
import { GPUBenchmarker } from './gpu_benchmarker.js';
import { NebiusNvidiaClient } from './nebius_nvidia_client.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PUBLIC_DIR = path.join(__dirname, 'public');
const PORT = process.env.PORT || 3004;

const grounding = new UIGroundingEngine({ screenWidth: 1920, screenHeight: 1080 });
const planner = new ActionPlanner(grounding);
const nebiusClient = new NebiusNvidiaClient({ preferredEngine: 'nebius' });

const detectedScreenElements = [
  { label: 'Customer Search Input', bbox: [100, 450, 140, 850], type: 'INPUT' },
  { label: 'Export Report Button', bbox: [900, 1600, 940, 1820], type: 'BUTTON' },
  { label: 'Sales Data Grid', bbox: [200, 100, 850, 1850], type: 'TABLE' }
];

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Health check endpoint for container probes & cloud orchestrators
  if (req.url === '/api/health' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'online',
      service: 'TensorMesh RPA',
      timestamp: new Date().toISOString()
    }));
    return;
  }

  // REST API Routes
  if (req.url === '/api/plan' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      try {
        const { prompt, engine } = JSON.parse(body);
        const client = new NebiusNvidiaClient({ preferredEngine: engine || 'nebius' });
        const plan = await client.planRpaSequence(prompt, detectedScreenElements);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ plan, elements: detectedScreenElements }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  if (req.url === '/api/benchmark' && req.method === 'GET') {
    const benchmark = GPUBenchmarker.runBenchmark();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(benchmark));
    return;
  }

  // Static files
  let filePath = path.join(PUBLIC_DIR, req.url === '/' ? 'index.html' : req.url);
  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8'
  };

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Server Error: ' + err.code);
      }
    } else {
      res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
      res.end(content);
    }
  });
});

server.listen(PORT, () => {
  console.log(`⚡ TensorMesh RPA Server running at http://localhost:${PORT}`);
});
