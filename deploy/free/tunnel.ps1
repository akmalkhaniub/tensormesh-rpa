param ([int]$Port = 3004)
$ErrorActionPreference = "Stop"
Write-Host "🌐 [Cloudflare Tunnel] Launching public tunnel for TensorMesh RPA at localhost:$Port..." -ForegroundColor Cyan

$cloudflaredCmd = Get-Command cloudflared -ErrorAction SilentlyContinue
if (-not $cloudflaredCmd) {
    $tempDir = Join-Path $env:TEMP "cloudflared"
    if (-not (Test-Path $tempDir)) { New-Item -ItemType Directory -Path $tempDir | Out-Null }
    $exePath = Join-Path $tempDir "cloudflared.exe"
    if (-not (Test-Path $exePath)) {
        Write-Host "⬇️ Downloading standalone cloudflared binary..." -ForegroundColor Yellow
        $url = "https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-windows-amd64.exe"
        Invoke-WebRequest -Uri $url -OutFile $exePath
    }
    $cloudflaredCmd = $exePath
} else {
    $cloudflaredCmd = "cloudflared"
}

Write-Host "🚀 Live Tunnel active! Share this URL with hackathon judges:" -ForegroundColor Green
& $cloudflaredCmd tunnel --url "http://localhost:$Port"
