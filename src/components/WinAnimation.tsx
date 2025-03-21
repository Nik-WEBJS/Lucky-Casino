"use client";

import { useEffect, useState } from "react";
import styles from "./WinAnimation.module.css";

interface WinAnimationProps {
  onComplete: () => void;
}

export default function WinAnimation({ onComplete }: WinAnimationProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className={styles.winAnimation}>
      <div className={styles.stars}>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={styles.star}
            style={
              {
                "--delay": `${i * 0.1}s`,
                "--position": `${Math.random() * 100}%`,
                "--size": `${Math.random() * 20 + 10}px`,
              } as never
            }
          />
        ))}
      </div>
      <div className={styles.winText}>
        <span className={styles.text}>ПОБЕДА!</span>
        <span className={styles.subText}>+50 💰</span>
      </div>
      <div className={styles.confetti}>
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className={styles.confettiPiece}
            style={
              {
                "--delay": `${i * 0.05}s`,
                "--rotation": `${Math.random() * 360}deg`,
                "--position": `${Math.random() * 100}%`,
                "--color": `hsl(${Math.random() * 360}, 100%, 50%)`,
              } as never
            }
          />
        ))}
      </div>
    </div>
  );
}
