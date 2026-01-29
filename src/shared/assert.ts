export function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

export function unreachable(x: never, message = "Unreachable"): never {
  throw new Error(`${message}: ${String(x)}`);
}
