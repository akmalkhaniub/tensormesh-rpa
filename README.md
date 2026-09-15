# Nebius × NVIDIA Global AI Hackathon

- **Official Challenge URL:** [https://nebiusglobalaihackathon.devpost.com/](https://nebiusglobalaihackathon.devpost.com/)
- **Organizer:** Nebius & NVIDIA
- **Host Platform:** Devpost
- **Total Prize Pool:** $50,000 USD
- **Submission Dates:** August 26, 2026 – October 30, 2026
- **Format:** Online / Global
- **Primary Themes:** Machine Learning / Generative AI, GPU Acceleration, Robotic Process Automation (RPA)

---

## 1. Hackathon Objective & Problem Statement
Nebius and NVIDIA challenge developers to build high-performance, GPU-accelerated AI applications that leverage high-throughput cloud compute (such as NVIDIA H100 / L40S clusters on Nebius AI Cloud).

Key areas include large multimodal model inference, real-time agentic automation, and high-efficiency model serving with low-latency constraints.

### Judging Criteria
1. **Technical Depth & Optimization (30%):** Effective utilization of GPU capabilities, inference engine optimization (vLLM, TensorRT-LLM), and compute scaling.
2. **Architecture & Reliability (25%):** Fault-tolerant microservices, asynchronous execution, and high concurrency.
3. **Real-World Impact (25%):** Solving meaningful commercial or societal problems with measurable performance metrics.
4. **Presentation & Code Quality (20%):** Clean reproducibility instructions, benchmarks, and architectural clarity.

---

## 2. Selected Project Concept: TensorMesh RPA (High-Throughput Vision-Agent Automation)
A GPU-accelerated vision-agent orchestrator that ingests live multi-screen desktop streams, executes real-time GUI element parsing via vision-language models (e.g. Qwen2-VL / Llama-3.2-Vision on TensorRT), and automates complex enterprise workflows with sub-100ms perceptual latency.

---

## 3. Directory Structure
```
nebius-nvidia-ai/
├── README.md               # Challenge rules, links, judging criteria (this file)
├── SPECIFICATION.md        # Architecture, vision pipeline, GPU acceleration spec
├── ROADMAP.md              # Milestone schedule towards October 30 deadline
├── inference-engine/       # TensorRT-LLM / vLLM serving container & benchmarks
├── agent-orchestrator/     # Screen capture, action planning, and mouse/keyboard automation
└── dashboard/              # Monitoring, telemetry, and manual intervention UI
```
