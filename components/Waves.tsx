/** Decorative AC waveforms for the converter paper tile (illustration, not data). */
export default function Waves() {
  const wave = (amp: number, phase: number) => {
    const pts: string[] = [];
    for (let x = 0; x <= 400; x += 8) {
      const y = 70 + amp * Math.sin((x / 400) * Math.PI * 4 + phase);
      pts.push(`${x === 0 ? "M" : "L"}${x} ${y.toFixed(1)}`);
    }
    return pts.join(" ");
  };
  return (
    <svg viewBox="0 0 400 140" preserveAspectRatio="none" aria-hidden className="h-full w-full">
      <g stroke="currentColor" strokeOpacity="0.14" strokeWidth="1">
        <path d="M0 70H400M0 35H400M0 105H400" />
        <path d="M100 0V140M200 0V140M300 0V140" />
      </g>
      <g fill="none" strokeWidth="2.2" strokeLinecap="round">
        <path d={wave(46, 0)} stroke="var(--accent)" className="wave" style={{ ["--d" as string]: "0s" }} />
        <path d={wave(34, 2.1)} stroke="var(--text)" strokeOpacity="0.8" className="wave" style={{ ["--d" as string]: "-1.6s" }} />
        <path d={wave(22, 4.2)} stroke="var(--amber)" className="wave" style={{ ["--d" as string]: "-3.1s" }} />
      </g>
    </svg>
  );
}
