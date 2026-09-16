# 🆓 Free Tier Deployment Guide for TensorMesh RPA

Deploy **TensorMesh RPA** using **Hugging Face Spaces (16GB RAM Free)**, **Render Blueprints**, and **Cloudflare Tunnels**.

---

## 1. Free AI Demo Host: Hugging Face Spaces
Hugging Face offers **16 GB RAM and 2 vCPUs completely free**:
1. Create a new Space at [huggingface.co/spaces](https://huggingface.co/spaces) with SDK: `Docker`.
2. Push your `Dockerfile`, `src/`, `package.json`, and `README_HF.md` (renamed to `README.md`).
3. Add `NEBIUS_API_KEY` under Space Settings (or leave empty for mock execution).

---

## 2. Instant Live Judge Demo: Cloudflare Tunnel
```powershell
# Windows
.\deploy\free\tunnel.ps1 -Port 3004

# Linux / macOS
./deploy/free/tunnel.sh 3004
```
Share the generated `https://*.trycloudflare.com` URL with hackathon reviewers!
