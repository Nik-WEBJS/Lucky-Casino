'use client';

import { useRouter } from 'next/navigation';
import SlotMachine from '@/components/SlotMachine';
import styles from './Slots.module.css';

export default function SlotsPage() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button 
          className={styles.backButton}
          onClick={() => router.push('/')}
        >
          ← Назад
        </button>
        <h1 className={styles.title}>Слоты</h1>
      </header>
      
      <main className={styles.main}>
        <SlotMachine />
      </main>
    </div>
  );
} 