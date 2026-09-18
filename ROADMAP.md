# Roadmap & Milestones: TensorMesh RPA
**Hackathon:** Nebius × NVIDIA Global AI Hackathon  
**Target Submission Deadline:** October 30, 2026  

---

> **Status legend (updated 2026-09-18):** `[x]` implemented in code · `[~]` partial / stand-in (working JS prototype, not the production stack named) · `[ ]` not started.
> **Reality note:** Node.js prototype with a UI-grounding engine, action planner, and mock Nebius/NVIDIA client + GPU benchmarker (366 LOC, passing tests). No real Nebius GPU instance, vLLM/TensorRT serving, screen capture, or OS automation drivers; benchmarks and dashboard are simulated/static.

## Phase 1: Model Optimization & Nebius Environment (Week 1)
- [ ] Spin up / configure Nebius AI Cloud instance with NVIDIA GPU (H100 / L40S).
- [~] Deploy vLLM / TensorRT-LLM container serving Qwen2-VL or Llama-3.2-11B-Vision. *(mock client)*
- [~] Benchmark baseline inference latency, memory footprint, and tokens/sec. *(simulated benchmarker)*

## Phase 2: Perceptual Pipeline & UI Grounding (Week 2)
- [ ] Implement fast desktop screenshot / WebRTC frame stream capture in Python / C++.
- [x] Create structured output parser converting model responses into deterministic coordinates and actions.
- [~] Build visual overlay tool highlighting predicted interactive elements on screen.

## Phase 3: Action Orchestration & Safety Guards (Week 3)
- [~] Integrate OS-level automation drivers (PyAutoGUI / robotjs) with safety bounding limits. *(planner logic, no real driver)*
- [~] Implement error recovery: detect stalled windows, unexpected dialogs, and retry logic.
- [~] Implement Web monitoring dashboard showing live frame stream, telemetry, and GPU utilization metrics. *(static dashboard)*

## Phase 4: Benchmarks, Demo Video & Submission (Week 4)
- [~] Run end-to-end benchmark demonstrating a multi-step invoice processing or legacy software automation. *(simulated)*
- [ ] Produce comparative charts showing GPU speedups and throughput advantages on Nebius Cloud.
- [ ] Record professional video walkthrough and submit to Devpost.
