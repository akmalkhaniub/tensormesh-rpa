/**
 * GPUBenchmarker - Profiles TensorRT-LLM on NVIDIA hardware vs a baseline CPU.
 * NOTE: figures are representative reference numbers for the demo, not a live
 * measurement from provisioned Nebius GPUs.
 */

export interface HardwareProfile {
  hardware: string;
  runtime: string;
  timeToFirstTokenMs: number;
  tokensPerSec: number;
  groundingLatencyPerFrameMs: number;
  vramUsageGb: number;
}

export interface BenchmarkResult {
  baselineCpu: HardwareProfile;
  nebiusNvidia: HardwareProfile;
  metrics: { ttftSpeedup: string; tokenThroughputGain: string; visionPerceptionGain: string };
}

export class GPUBenchmarker {
  static runBenchmark(): BenchmarkResult {
    const baselineCpu: HardwareProfile = {
      hardware: 'Generic 16-Core Cloud CPU',
      runtime: 'HuggingFace PyTorch FP32',
      timeToFirstTokenMs: 840,
      tokensPerSec: 14.2,
      groundingLatencyPerFrameMs: 1250,
      vramUsageGb: 0
    };

    const nebiusNvidia: HardwareProfile = {
      hardware: 'NVIDIA H100 80GB SXM (Nebius AI Cloud)',
      runtime: 'TensorRT-LLM FP8 Quantized',
      timeToFirstTokenMs: 48,
      tokensPerSec: 186.5,
      groundingLatencyPerFrameMs: 72,
      vramUsageGb: 14.8
    };

    return {
      baselineCpu,
      nebiusNvidia,
      metrics: {
        ttftSpeedup: `${(baselineCpu.timeToFirstTokenMs / nebiusNvidia.timeToFirstTokenMs).toFixed(1)}x faster`,
        tokenThroughputGain: `${(nebiusNvidia.tokensPerSec / baselineCpu.tokensPerSec).toFixed(1)}x higher throughput`,
        visionPerceptionGain: `${(baselineCpu.groundingLatencyPerFrameMs / nebiusNvidia.groundingLatencyPerFrameMs).toFixed(1)}x lower perceptual latency`
      }
    };
  }
}
