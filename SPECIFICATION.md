# Technical Specification: TensorMesh RPA
**Project Name:** TensorMesh RPA (Nebius × NVIDIA Global AI Hackathon)  
**Status:** Prototype implemented — spec is target design (updated 2026-09-18)  

> **Implementation status (2026-09-18):** The sections below describe the *target* architecture. Built: a Node.js UI-grounding parser (model output → coordinates/actions), an action planner, and a **mock** Nebius/NVIDIA client + GPU benchmarker (366 LOC, passing tests). Not yet built: a real Nebius GPU instance, vLLM/TensorRT-LLM VLM serving, live screen/WebRTC capture, and real OS automation drivers. Benchmarks and the monitoring dashboard are simulated/static.
**Version:** 1.0.0  

---

## 1. System Architecture
TensorMesh RPA connects high-speed frame capture with cloud GPU inference running on Nebius Cloud (powered by NVIDIA GPUs). An optimized Vision-Language Model (VLM) parses the UI state into structured interactive targets, and an action planner generates safe execution traces.

```mermaid
graph TD
    A[Desktop / VM Screen Buffer] -->|WebRTC / NDI 30fps| B[Video Frame Ingestion Pipeline]
    B -->|Batched Image Tensors| C[NVIDIA GPU Worker on Nebius Cloud]
    C -->|TensorRT-LLM / vLLM| D[Vision-Language Model (Qwen2-VL / Llama-Vision)]
    D -->|Coordinate JSON & Action Plan| E[Safe Action Validator]
    E -->|OS Events (Click, Type, Scroll)| F[Virtual OS Automation Driver]
    C -->|Telemetry & Latency Logs| G[Prometheus / Grafana Dashboard]
```

---

## 2. Functional Requirements

### 2.1 Low-Latency Video Ingestion
- Ingest high-resolution desktop frames (1080p / 1440p) at minimum 15-30 FPS.
- Apply dynamic cropping and downsampling heuristics to conserve GPU memory while preserving text legibility.

### 2.2 GPU-Accelerated Grounding & Planning
- Predict UI bounding boxes `(ymin, xmin, ymax, xmax)` with sub-100ms inference time using TensorRT-LLM fp8/int8 quantization.
- Parse complex enterprise forms (SAP, Salesforce, legacy desktop software) without DOM or accessibility API access.

### 2.3 Safe Action Execution Loop
- Generate structured actions: `CLICK(x, y)`, `TYPE(text)`, `KEY_COMBO(keys)`, `WAIT_UNTIL_VISIBLE(target)`.
- Enforce human-in-the-loop validation barriers for financial transactions or irreversible actions.

---

## 3. Performance Targets
- **Time-to-First-Token (TTFT):** `< 60ms` on NVIDIA H100 / L40S.
- **End-to-End Action Latency:** Frame capture to OS action execution in `< 250ms`.
- **Grounding Accuracy:** `> 94%` intersection-over-union (IoU) on standard enterprise UI test suites.

---

## 4. Acceptance Criteria
1. Successfully run automated workflow across a legacy desktop application (e.g. data extraction and re-entry).
2. Documented benchmark showing latency comparison between standard HuggingFace pipeline vs TensorRT-LLM / vLLM on Nebius Cloud.
3. Live dashboard displaying real-time stream, detected bounding boxes, and action logs.
