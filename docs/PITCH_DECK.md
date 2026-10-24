# ⚡ TensorMesh RPA — 16:9 Pitch Deck
**Event:** [Nebius × NVIDIA Global AI Hackathon](https://nebiusglobalaihackathon.devpost.com/)  
**Prize Pool:** $50,000 USD  
**Track:** Accelerated GPU Computing & Next-Gen Robotic Process Automation  
**Presenter:** Akmal Khan (@akmalkhaniub)  
**Format:** 16:9 Presentation Slides (Exportable to PDF via `pitch_deck.html`)

---

## Slide 1: Title & Hero
### **TensorMesh RPA**
#### Ultra-Low-Latency Visual Desktop Automation on Nebius H100 SXM
*Powered by Nebius Token Factory 2026, NVIDIA TensorRT-LLM, and Multi-Engine Failover*

- **Presenter:** Akmal Khan
- **Hackathon:** Nebius × NVIDIA Global AI Hackathon 2026 (Devpost)
- **Repository:** [https://github.com/akmalkhaniub/tensormesh-rpa](https://github.com/akmalkhaniub/tensormesh-rpa)
- **Visual:** The desktop simulator and a timing card that stays “not measured” until a live response returns.

---

## Slide 2: The Enterprise RPA Bottleneck
### **The \$14B Legacy Automation Wall**
- **70% of Enterprise Workflows** run on legacy thick-client software (SAP GUI, Oracle ERP, AS400, proprietary desktop tools) with zero modern REST or GraphQL APIs.
- **Traditional RPA Fragility**: Legacy tools like UiPath rely on rigid DOM selectors or fragile OCR that break when fonts, window offsets, or screen resolutions shift by 1 pixel.
- **The Cloud AI Latency Problem**: Traditional cloud LLMs suffer from 800ms+ Time-to-First-Token (TTFT) and under 20 tokens/sec throughput, making real-time cursor control jerky, slow, and prone to user interruption.

---

## Slide 3: The Solution — TensorMesh RPA
### **Human-Speed Visual OS Robotic Automation**
- **Dual-Engine Accelerated Inference**:
  - Primary: **Nebius Token Factory** (`https://api.studio.nebius.ai/v1`) driving Meta-Llama-3.1-70B on 80GB H100 SXM.
  - Failover: **NVIDIA NIM Catalog** (`https://integrate.api.nvidia.com/v1`) with `meta/llama-3.3-70b-instruct`.
- **Live inference when a key is set**:
  - Nebius Token Factory or NVIDIA NIM is called with streaming enabled.
  - Time-to-first-token is taken from the first content chunk. Tokens per second are recorded only when the response includes `usage.completion_tokens`.
  - Without a key, the planner is a simulator and the page says the timing is not measured.
- **Spatial UI Grounding Engine**:
  - Translates natural language goals into bounding box centroids and absolute pixel actions `(X, Y)` with spatial safety assertion.

---

## Slide 4: Hardware Acceleration Benchmarking
### **Nebius H100 SXM vs. Cloud CPU Baselines**

| Hardware Architecture | TTFT | Throughput | Status |
| :--- | :--- | :--- | :--- |
| Generic 16-core cloud CPU | — | — | Not measured in this build |
| Nebius or NVIDIA NIM | Recorded from the streamed response | Recorded only when the API returns `usage.completion_tokens` | Live when a key is set; otherwise the simulator |

*No speedup multiple is claimed. Earlier 48 ms / 186.5 tps figures were not measurements and have been removed.*

---

## Slide 5: System Architecture & Data Flow
```
[ Natural Language Human Instruction ]
                 │
                 ▼
[ Multi-Engine Inference Orchestrator ]
  ├── Primary: Nebius Token Factory (H100 SXM FP8)
  └── Failover: NVIDIA NIM Catalog API
                 │
                 ▼
     [ Visual Grounding Engine ]
  ├── 1920x1080 Spatial Centroid Mapper
  └── Bounds Safety Check (0 <= X <= 1920, 0 <= Y <= 1080)
                 │
                 ▼
[ Deterministic Robotic Action Stream ]
  ├── [CLICK]: Focus search field at (650, 120)
  ├── [TYPE]: Input query "Q3_Enterprise_Audit_2026"
  ├── [KEY_PRESS]: Send Enter key
  └── [CLICK]: Click "Export CSV" button at (1710, 920)
```

---

## Slide 6: Enterprise Safety & Bounding Geometry
### **Deterministic Guardrails Against Errant Clicks**
- **Centroid Calculation**: Calculates target element coordinates with sub-pixel rounding.
- **Spatial Safety Enclosures**: Rejects any click coordinates that fall outside authorized application viewport bounds.
- **Rollback / Abort Safety Interlocks**: Halts execution instantly if unexpected dialogue boxes or OS alerts alter the target element visual hashing.

---

## Slide 7: Interactive Virtual Desktop Simulator
### **Live Robotic Automation Console**
- **Virtual Enterprise ERP Canvas**: Visualizes dynamic application windows with highlighted interactive bounding boxes.
- **Animated Robotic Cursor**: Real-time canvas vector path rendering displaying cursor trajectory, acceleration curves, and click clicks.
- **Live timing**: The hardware card shows time-to-first-token only after a real streamed response. Throughput appears only when the API reports completion tokens.
- **Zero-Config Fallback**: Testable immediately on `http://localhost:3004`.

---

## Slide 8: Enterprise Roadmap & Vision
### **Autonomous Digital Workers on Accelerated Hardware**
- **Q4 2026**: Multi-monitor 4K spatial grounding and localized VLM edge models (NVIDIA Jetson AGX Orin).
- **Q1 2027**: Closed-loop visual error recovery via NVIDIA NIM multimodal reasoning models.
- **Q2 2027**: Zero-code natural language workflow recorder for Fortune 500 ERP migrations.
- **Experience TensorMesh today**: Clone `github.com/akmalkhaniub/tensormesh-rpa`!
