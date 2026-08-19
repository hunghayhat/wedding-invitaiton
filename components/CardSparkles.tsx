function createOuterLights() {
  const lights: Array<{
    top: string;
    left: string;
    size: number;
    delay: string;
    duration: string;
    drift: string;
  }> = [];

  function add(top: number, left: number, seed: number) {
    lights.push({
      top: `${top}%`,
      left: `${left}%`,
      size: 5 + (seed % 6),
      delay: `${((seed * 7) % 280) / 100}s`,
      duration: `${5 + ((seed * 3) % 40) / 10}s`,
      drift: seed % 2 === 0 ? "card-light-a" : "card-light-b",
    });
  }

  for (let i = 0; i < 16; i += 1) {
    const seed = 11 + i * 47;
    add(3 + (seed % 120) / 10, 4 + (i * 92) / 15, seed);
  }

  for (let i = 0; i < 16; i += 1) {
    const seed = 203 + i * 47;
    add(85 + (seed % 120) / 10, 4 + (i * 92) / 15, seed);
  }

  for (let i = 0; i < 22; i += 1) {
    const seed = 401 + i * 47;
    add(14 + (i * 72) / 21, 3 + (seed % 110) / 10, seed);
  }

  for (let i = 0; i < 22; i += 1) {
    const seed = 607 + i * 47;
    add(14 + (i * 72) / 21, 86 + (seed % 110) / 10, seed);
  }

  return lights;
}

const lights = createOuterLights();

export function CardSparkles() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-20 overflow-hidden sm:rounded-2xl"
    >
      {lights.map((light, index) => (
        <span
          key={index}
          className={`card-light ${light.drift}`}
          style={{
            top: light.top,
            left: light.left,
            width: light.size,
            height: light.size,
            animationDelay: light.delay,
            animationDuration: light.duration,
          }}
        />
      ))}
    </div>
  );
}
