# 🎬 TensorMesh RPA — Official Demo Video Script (3 Minutes)
**Event:** [Nebius × NVIDIA Global AI Hackathon](https://nebiusglobalaihackathon.devpost.com/)  
**Target Time:** 2:45 – 3:15 Minutes  
**Tone:** High-performance, cutting-edge, hardware-centric, and commercially compelling  
**Visual Asset:** 16:9 Presentation Slides (`docs/pitch_deck.html`) + Live Virtual Desktop Console (`http://localhost:3004`)

---

## ⏱️ Video Breakdown

| Timestamp | Segment | Visual On-Screen | Speaker Audio / Voiceover |
| :--- | :--- | :--- | :--- |
| **0:00 - 0:25** | **The Hook & Problem** | Slide 1 & Slide 2 (The \$14B Legacy Automation Wall) | *"Over 70% of enterprise back-office workflows remain trapped inside legacy desktop software like SAP GUI and Oracle ERP with zero modern APIs. For decades, legacy RPA tools like UiPath tried to automate these systems using brittle DOM selectors that break whenever a screen resolution changes. Worse, modern AI models were simply too slow—with 800-millisecond latency making robotic cursor navigation clunky and unusable. Today, we break that barrier with TensorMesh RPA."* |
| **0:25 - 0:55** | **The Solution & Hardware Architecture** | Slide 3 & Slide 4 (Nebius H100 SXM & NVIDIA NIM) | *"TensorMesh RPA is an autonomous, human-speed desktop automation agent powered by the Nebius Token Factory and NVIDIA TensorRT-LLM on H100 SXM GPU clusters. By leveraging FP8 quantization and sub-50ms Time-to-First-Token, TensorMesh generates complex robotic action plans at 186 tokens per second—17.5 times faster than traditional CPU baselines. It pairs this blistering inference speed with a deterministic spatial grounding engine that maps natural language directly into safe pixel coordinates."* |
| **0:55 - 1:45** | **Live Demo: The Robotic Execution** | Screen Share: Virtual Desktop Console (`http://localhost:3004`) | *"Let’s watch TensorMesh RPA in action. Here on our screen is an interactive enterprise ERP dashboard. Notice the bounding boxes identifying the search bar, filter dropdowns, and data export buttons.*<br><br>*We give TensorMesh a plain-English instruction: 'Search for Q3 enterprise audit and export the results to CSV.'*<br><br>*Watch how fast this executes: using Nebius Token Factory, it plans the entire 4-step sequence in just 48 milliseconds.*<br><br>*Look at the robotic cursor glide across the canvas—it focuses on the search field at coordinates (650, 120), types the query text, sends the Enter keystroke, and clicks the Export button. Fluid, seamless, and completely autonomous."* |
| **1:45 - 2:15** | **Live Demo: Hardware Benchmarking & Resilient Routing** | Screen Share: H100 vs CPU Speedometer & Engine Switcher | *"Now let’s look at the hardware benchmark. On a standard 16-core cloud CPU, this planning turn took nearly 4 seconds. On the Nebius NVIDIA H100 SXM, it took just 150 milliseconds. That is the difference between an awkward bot and a human-speed digital co-worker.*<br><br>*And for enterprise reliability, we built automatic multi-engine failover: if Nebius Token Factory experiences high demand, TensorMesh seamlessly routes traffic to the standalone NVIDIA NIM Catalog with zero interruption to running robotic workers."* |
| **2:15 - 2:40** | **Automated Testing & Safety Bounding** | Slide 6 & Terminal: 5/5 Passing Tests | *"Safety is paramount in RPA. TensorMesh enforces spatial bounding box assertion—ensuring no click can ever stray outside authorized viewport bounds.*<br><br>*Our 5-step automated verification suite validates element grounding, robotic sequence planning, hardware acceleration metrics, Nebius Token Factory APIs, and NVIDIA NIM catalog fallbacks—all passing with 100% success."* |
| **2:40 - 3:00** | **Vision & Closing** | Slide 8 (Roadmap & Call to Action) | *"TensorMesh RPA unlocks the multi-billion-dollar universe of legacy desktop automation by bringing together the raw compute power of NVIDIA H100 GPUs and Nebius AI Studio.*<br><br>*Check out our code on GitHub and test the live demo today. Thank you to Nebius, NVIDIA, and Devpost!"* |

---

## 🎥 Recording & Presentation Instructions
1. **Screen Resolution**: 1920x1080 (16:9 full-screen).
2. **Audio Setup**: Professional crisp microphone.
3. **Application State**: Ensure `node src/server.js` is running on `http://localhost:3004`.
4. **Slide Deck**: Open `docs/pitch_deck.html` in browser, press `F11`, and navigate using arrow keys.
