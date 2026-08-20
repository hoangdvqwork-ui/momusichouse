// Shared tempo so every ambient/pulsing animation across the site
// breathes on the same clock instead of arbitrary per-component speeds.
// 72bpm: slow enough to read as "ambient," not a literal metronome.
export const BPM = 72;

/** Sine wave locked to the shared tempo. beatsPerCycle: how many beats
 *  one full sine cycle takes (4 = a slow bar-length breathing motion,
 *  1 = pulses on every beat). */
export function beatSin(t: number, beatsPerCycle = 4, phaseOffset = 0) {
  const cyclesPerSecond = BPM / 60 / beatsPerCycle;
  return Math.sin(t * cyclesPerSecond * Math.PI * 2 + phaseOffset);
}

/** CSS animation-duration string for one full beatsPerCycle, for
 *  components that pulse via CSS keyframes instead of canvas/JS. */
export function beatDurationMs(beatsPerCycle = 4) {
  return (60 / BPM) * beatsPerCycle * 1000;
}
