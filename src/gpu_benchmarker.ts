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
  /**
   * No fabricated GPU numbers. A live measurement is attached later via
   * `recordLiveSample` after a real Nebius or NIM response.
   */
  static runBenchmark(): BenchmarkResult & { measured: boolean; note: string } {
    return {
      measured: false,
      note: 'Unmeasured. Set NEBIUS_API_KEY or NVIDIA_API_KEY and call the live client; latency comes from that response, not from this function.',
      baselineCpu: {
        hardware: 'not measured',
        runtime: 'n/a',
        timeToFirstTokenMs: 0,
        tokensPerSec: 0,
        groundingLatencyPerFrameMs: 0,
        vramUsageGb: 0
      },
      nebiusNvidia: {
        hardware: 'not measured',
        runtime: 'n/a',
        timeToFirstTokenMs: 0,
        tokensPerSec: 0,
        groundingLatencyPerFrameMs: 0,
        vramUsageGb: 0
      },
      metrics: {
        ttftSpeedup: 'unmeasured',
        tokenThroughputGain: 'unmeasured',
        visionPerceptionGain: 'unmeasured'
      }
    };
  }

  /** Turn one live API timing into the benchmark record. */
  static recordLiveSample(latencyMs: number, completionTokens: number): { latencyMs: number; throughputTps: number; measured: true } {
    const throughputTps = latencyMs > 0 ? Number((completionTokens / (latencyMs / 1000)).toFixed(1)) : 0;
    return { latencyMs, throughputTps, measured: true };
  }
}
