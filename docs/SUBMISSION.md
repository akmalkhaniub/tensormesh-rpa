# TensorMesh submission notes

Deadline 30 Oct 2026.

## What a judge can run today

```bash
npm install
npm run dev
```

Open http://localhost:3004 and run a plan. Without `NEBIUS_API_KEY` or `NVIDIA_API_KEY` the planner is a simulator and latency is 0. `GPUBenchmarker.runBenchmark()` returns `measured: false`. A live response can be recorded with `GPUBenchmarker.recordLiveSample(latencyMs, completionTokens)`.

## Not in this submission

No Nebius or NVIDIA timing, no GPU, and no public URL.
