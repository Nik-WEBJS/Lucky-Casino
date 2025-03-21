'use client';

import { useRouter } from 'next/navigation';
import { SlotIcon, DiceIcon, CardIcon, RouletteIcon } from '../components/icons';
import GameCard from '../components/GameCard';
import styles from '../styles/Home.module.css';

const games = [
  {
    id: 'slots',
    title: 'Слоты',
    description: 'Классическая игра в слоты с тремя барабанами и множеством символов',
    icon: <SlotIcon />,
    isAvailable: true,
  },
  {
    id: 'dice',
    title: 'Кости',
    description: 'Бросьте кости и попробуйте угадать результат',
    icon: <DiceIcon />,
    isAvailable: false,
  },
  {
    id: 'cards',
    title: 'Карты',
    description: 'Сыграйте в классические карточные игры',
    icon: <CardIcon />,
    isAvailable: false,
  },
  {
    id: 'roulette',
    title: 'Рулетка',
    description: 'Сделайте ставку на число или цвет в классической рулетке',
    icon: <RouletteIcon />,
    isAvailable: false,
  },
];

export default function Home() {
  const router = useRouter();

  const handleGameClick = (gameId: string) => {
    if (gameId === 'slots') {
      router.push('/slots');
    }
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Добро пожаловать в казино!</h1>
        <p className={styles.description}>Выберите игру и начните играть прямо сейчас</p>
        
        <div className={styles.grid}>
          {games.map((game) => (
            <GameCard
              key={game.id}
              title={game.title}
              description={game.description}
              icon={game.icon}
              isAvailable={game.isAvailable}
              onClick={() => handleGameClick(game.id)}
            />
          ))}
        </div>
      </main>
    </div>
  );
} 