'use client';

import { ReactNode } from 'react';
import styles from './GameCard.module.css';

interface GameCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  onClick: () => void;
  isAvailable?: boolean;
}

export default function GameCard({ 
  title, 
  description, 
  icon, 
  onClick, 
  isAvailable = true 
}: GameCardProps) {
  return (
    <div 
      className={`${styles.card} ${!isAvailable ? styles.disabled : ''}`}
      onClick={isAvailable ? onClick : undefined}
    >
      <div className={styles.icon}>{icon}</div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
      {!isAvailable && (
        <div className={styles.comingSoon}>Скоро</div>
      )}
    </div>
  );
} 