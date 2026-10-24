# ⚡ TensorMesh RPA — Ultra-Low-Latency Visual Desktop Automation

[![TypeScript: strict](https://img.shields.io/badge/TypeScript-strict-3178c6.svg)](https://www.typescriptlang.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Nebius: Token Factory](https://img.shields.io/badge/Nebius-Token%20Factory%202026-blueviolet.svg)](https://studio.nebius.ai)
[![NVIDIA: TensorRT-LLM](https://img.shields.io/badge/NVIDIA-TensorRT--LLM%20H100-76B900.svg)](https://www.nvidia.com)
[![Tests: 100% Passing](https://img.shields.io/badge/Tests-5%2F5%20Passed-emerald.svg)](./test)

> **Built for the [Nebius AI Studio & NVIDIA NIM Hackathon (Devpost)](https://nebius-nvidia.devpost.com/)**  
> *Submission Deadline: October 30, 2026, 10:00am PDT*

TensorMesh RPA plans desktop actions from a written instruction. With `NEBIUS_API_KEY` or `NVIDIA_API_KEY` it calls Nebius Token Factory or NVIDIA NIM and records time-to-first-token from the streamed response. Without a key it runs a deterministic simulator and reports latency as not measured.

---

## ⚡ 2026 Architecture & Hardware Acceleration

```
[ Natural Language Automation Prompt ]
                 │
                 ▼
[ Multi-Engine Inference Orchestrator ]
  ├── Primary: Nebius Token Factory (https://api.studio.nebius.ai/v1)
  │     └── Meta-Llama-3.1-70B-Instruct (H100 80GB SXM)
  └── Secondary: NVIDIA NIM Catalog (https://integrate.api.nvidia.com/v1)
        └── meta/llama-3.3-70b-instruct
                 │
                 ▼
     [ Visual Grounding Engine ]
  ├── 1920x1080 Screen Coordinate Mapper
  ├── Spatial Safety Boundary Assertion
  └── UI Element Centroid Calculation
                 │
                 ▼
[ Deterministic Robotic Execution Stream ]
  ├── Step 1 [CLICK]: Focus on search input at (650, 120)
  ├── Step 2 [TYPE]: Input query string "Q3_Enterprise_Audit_2026"
  ├── Step 3 [KEY_PRESS]: Send Enter key to submit query
  └── Step 4 [CLICK]: Click Export Button at (1710, 920)
```

### 1. Nebius Token Factory & NVIDIA NIM Dual-Engine Support
Employs the 2026 **Nebius Token Factory** OpenAI-compatible API (`https://api.studio.nebius.ai/v1`) running on Nebius H100 SXM clusters with automatic failover to the standalone **NVIDIA NIM Catalog** (`https://integrate.api.nvidia.com/v1`).

### 2. Measured timing
GPU latency and throughput are recorded only from a live streamed response (`measured: true`, with token counts taken from the API usage field). The simulator returns `measured: false` and does not publish a tokens-per-second figure.

### 3. Spatial Grounding & Safety Bounding
Maps screen elements (inputs, tables, buttons) into safe pixel coordinates `(X, Y)` bounded inside the display resolution, preventing dangerous out-of-bounds clicks.

---

## 📁 Repository Structure

```
nebius-nvidia-ai/
├── src/
│   ├── nebius_nvidia_client.js    # 2026 dual-engine Nebius & NVIDIA client
│   ├── ui_grounding_engine.js     # Screen coordinate grounding & bounding
│   ├── action_planner.js          # Multi-step robotic sequence generator
│   ├── gpu_benchmarker.js         # H100 TensorRT-LLM vs CPU profiler
│   ├── server.js                  # TensorMesh RPA server
│   └── public/
│       └── index.html             # Interactive virtual desktop simulator UI
├── test/
│   └── verify_tensormesh.js       # 5-step automated test suite
├── SPECIFICATION.md               # Technical specification
├── ROADMAP.md                     # Sprint milestones
├── package.json
└── README.md
```

---

## 🚀 Quickstart & Interactive Desktop Simulator

### Prerequisites
- Node.js `v20.0.0+`

### Setup & Launch
```bash
# Clone the repository
git clone https://github.com/akmalkhaniub/tensormesh-rpa.git
cd tensormesh-rpa

# Install dependencies
npm install

# Start the virtual desktop simulator
node src/server.js
# Access the simulator at http://localhost:3004
```

Open [http://localhost:3004](http://localhost:3004) in your browser:
1. View the **Enterprise ERP Workspace** with bounding box overlays.
2. Select **Nebius Token Factory** or **NVIDIA NIM** from the engine dropdown.
3. Click **"Execute RPA"** to watch the robotic cursor autonomously glide to the search input, type query text, press Enter, and click Export.
4. The hardware card stays **not measured** until that plan came from a live API call.

---

## 🧪 Automated Verification Suite

Run all 5 automated unit and integration tests:
```bash
node test/verify_tensormesh.js
```

### Verification Results
Run `npm test`. The suite checks grounding, the action planner, that `runBenchmark()` returns `measured: false`, the simulator plan, the response parser, and that a stream without a usage field does not invent a token count. It does not print a GPU speed.

---

## ⚖️ License
MIT License. Created by Akmal Khan for the Nebius AI Studio & NVIDIA NIM Hackathon 2026.
