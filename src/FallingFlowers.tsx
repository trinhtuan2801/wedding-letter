import { useMemo } from "react";
import { motion } from "framer-motion";

const FLOWER_CHARS = ["✿", "❀", "✾", "❁"];
const COUNT = 25;

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export function FallingFlowers() {
  const flowers = useMemo(
    () =>
      Array.from({ length: COUNT }, (_, i) => {
        const duration = randomBetween(15, 20);
        const delay = randomBetween(0, duration);
        return {
          id: i,
          char: FLOWER_CHARS[i % FLOWER_CHARS.length],
          x: randomBetween(0, 100),
          size: randomBetween(12, 28),
          duration,
          delay,
          opacity: randomBetween(0.3, 0.7),
          hue: randomBetween(320, 360),
          // Stagger initial Y so flowers are spread along the fall path (continuous flow)
          initialY: -randomBetween(20, 100),
          // Slight tilt only: avoid rotateX/Y near ±90° so flowers stay visible
          rotateX: randomBetween(-40, 40),
          rotateY: randomBetween(-40, 40),
          rotateZ: randomBetween(-360, 360),
        };
      }),
    []
  );

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
        overflow: "hidden",
        perspective: "800px",
      }}
      aria-hidden
    >
      {flowers.map((f) => (
        <motion.span
          key={f.id}
          style={{
            position: "absolute",
            left: `${f.x}%`,
            top: 0,
            fontSize: `${f.size}px`,
            opacity: f.opacity,
            color: `hsl(${f.hue}, 70%, 75%)`,
            textShadow: "0 0 8px rgba(255,255,255,0.3)",
            willChange: "transform",
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
          }}
          initial={{
            y: `${f.initialY}vh`,
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
          }}
          animate={{
            y: "110vh",
            rotateX: f.rotateX,
            rotateY: f.rotateY,
            rotateZ: f.rotateZ,
          }}
          transition={{
            duration: f.duration,
            delay: f.delay,
            repeat: Infinity,
            repeatDelay: 0,
          }}
        >
          {f.char}
        </motion.span>
      ))}
    </div>
  );
}
