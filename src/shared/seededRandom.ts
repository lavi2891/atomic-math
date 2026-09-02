export function createSeededRandom(seed: number): () => number {
  let state = Math.trunc(seed) >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 0x1_0000_0000;
  };
}

export class SeedSequence {
  private nextValue: number;
  constructor(seed: number) { this.nextValue = Math.trunc(seed) >>> 0; }
  next(): number {
    this.nextValue = (this.nextValue * 1664525 + 1013904223) >>> 0;
    return this.nextValue;
  }
}

export function createRuntimeSeed(): number {
  if (globalThis.crypto?.getRandomValues) {
    const values = new Uint32Array(1);
    globalThis.crypto.getRandomValues(values);
    return values[0] ?? Date.now();
  }
  return (Date.now() ^ Math.floor(Math.random() * 0xffff_ffff)) >>> 0;
}
