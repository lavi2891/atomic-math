export const STAR_REVEAL_INTERVAL_MS = 300;

let activeOscillator: OscillatorNode | undefined;

/** A quiet optional cue. Unsupported or blocked Web Audio simply leaves visual feedback intact. */
export function playEarnedStarSound(starNumber: number): void {
  if (typeof window === "undefined" || typeof window.AudioContext !== "function" || document.hidden) return;
  try {
    activeOscillator?.stop();
    const context = new window.AudioContext();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const now = context.currentTime;
    oscillator.type = "sine";
    oscillator.frequency.value = 440 + starNumber * 70;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.025, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start(now);
    oscillator.stop(now + 0.1);
    activeOscillator = oscillator;
    oscillator.addEventListener("ended", () => {
      if (activeOscillator === oscillator) activeOscillator = undefined;
      void context.close();
    }, { once: true });
  } catch {
    // Sound is decorative; browser audio policy must never block progression.
  }
}
