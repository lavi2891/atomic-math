export interface RandomSource {
  nextFloat(): number;
  nextInt(minInclusive: number, maxInclusive: number): number;
  chance(probability: number): boolean;
}

function nextRandomUint32(state: number): number {
  let x = state >>> 0;
  x ^= x << 13;
  x ^= x >>> 17;
  x ^= x << 5;
  return x >>> 0;
}

export function createRandom(seed: number): RandomSource {
  let state = seed >>> 0;
  if (state === 0) {
    state = 0x9e3779b9;
  }

  const nextUint32 = (): number => {
    state = nextRandomUint32(state);
    return state;
  };

  return {
    nextFloat(): number {
      return nextUint32() / 0x1_0000_0000;
    },
    nextInt(minInclusive: number, maxInclusive: number): number {
      const min = Math.ceil(Math.min(minInclusive, maxInclusive));
      const max = Math.floor(Math.max(minInclusive, maxInclusive));
      if (min === max) return min;
      const span = max - min + 1;
      return min + Math.floor((nextUint32() / 0x1_0000_0000) * span);
    },
    chance(probability: number): boolean {
      if (probability <= 0) return false;
      if (probability >= 1) return true;
      return this.nextFloat() < probability;
    },
  };
}

export function fnv1a32(input: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return hash >>> 0;
}
