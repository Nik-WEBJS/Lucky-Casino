"use client";

import { useState, useEffect } from "react";
import { SlotIcons } from "./SlotIcons";
import styles from "./SlotMachine.module.css";
import WinAnimation from "./WinAnimation";

const SYMBOLS = Object.keys(SlotIcons);
const REEL_COUNT = 3;
const SPIN_DURATION = 2000;
const WINNING_SPIN_INTERVAL = 3;
const SPIN_INTERVAL = 100; // Интервал обновления символов во время вращения

export default function SlotMachine() {
  const [reels, setReels] = useState<string[]>(["seven", "seven", "seven"]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [balance, setBalance] = useState(1000);
  const [spinCount, setSpinCount] = useState(0);
  const [showWinAnimation, setShowWinAnimation] = useState(false);
  const [spinningReels, setSpinningReels] = useState<string[]>([]);

  useEffect(() => {
    let spinInterval: NodeJS.Timeout;

    if (isSpinning) {
      spinInterval = setInterval(() => {
        setSpinningReels(Array(REEL_COUNT).fill(null).map(() => 
          SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
        ));
      }, SPIN_INTERVAL);
    }

    return () => {
      if (spinInterval) {
        clearInterval(spinInterval);
      }
    };
  }, [isSpinning]);

  const spin = () => {
    if (isSpinning) return;
    if (balance < 10) {
      alert("Недостаточно средств!");
      return;
    }

    setIsSpinning(true);
    setBalance((prev) => prev - 10);
    setSpinCount((prev) => prev + 1);

    const newSpinCount = spinCount + 1;
    const isWinningSpin = newSpinCount % WINNING_SPIN_INTERVAL === 0;

    setTimeout(() => {
      const newReels = isWinningSpin
        ? Array(REEL_COUNT).fill("seven") // Всегда выигрышная комбинация
        : Array(REEL_COUNT).fill(null).map(() => 
            SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
          );

      setReels(newReels);
      setIsSpinning(false);
      setSpinningReels([]);

      if (isWinningSpin) {
        setBalance((prev) => prev + 50);
        setShowWinAnimation(true);
      }
    }, SPIN_DURATION);
  };

  const handleWinAnimationComplete = () => {
    setShowWinAnimation(false);
  };

  return (
    <div className={styles.container}>
      {showWinAnimation && (
        <WinAnimation onComplete={handleWinAnimationComplete} />
      )}
      
      <div className={styles.reels}>
        {reels.map((symbol, index) => (
          <div key={index} className={styles.reel}>
            <div className={`${styles.symbol} ${isSpinning ? styles.spinning : ''}`}>
              {isSpinning 
                ? SlotIcons[spinningReels[index] as keyof typeof SlotIcons]
                : SlotIcons[symbol as keyof typeof SlotIcons]
              }
            </div>
          </div>
        ))}
      </div>

      <div className={styles.controls}>
        <div className={styles.balance}>
          Баланс: {balance} 💰
        </div>
        <button 
          className={styles.spinButton}
          onClick={spin}
          disabled={isSpinning}
        >
          {isSpinning ? 'Крутим...' : 'Крутить (10 💰)'}
        </button>
        <div className={styles.spinCounter}>
          До выигрыша: {WINNING_SPIN_INTERVAL - (spinCount % WINNING_SPIN_INTERVAL)}
        </div>
      </div>
    </div>
  );
}
