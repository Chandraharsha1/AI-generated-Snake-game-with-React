import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'motion/react';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
];
const INITIAL_DIRECTION = { x: 0, y: -1 };

export default function SnakeGame() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  const generateFood = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
    return newFood;
  }, []);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(generateFood());
    setGameOver(false);
    setScore(0);
    setIsPaused(false);
  };

  const moveSnake = useCallback(() => {
    if (gameOver || isPaused) return;

    setSnake((prevSnake) => {
      const head = prevSnake[0];
      const newHead = {
        x: (head.x + direction.x + GRID_SIZE) % GRID_SIZE,
        y: (head.y + direction.y + GRID_SIZE) % GRID_SIZE,
      };

      // Check collision with self
      if (prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
        setGameOver(true);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // Check collision with food
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore((s) => s + 10);
        setFood(generateFood());
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameOver, isPaused, generateFood]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction.y !== 1) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (direction.y !== -1) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (direction.x !== 1) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (direction.x !== -1) setDirection({ x: 1, y: 0 });
          break;
        case ' ':
          setIsPaused((p) => !p);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  useEffect(() => {
    gameLoopRef.current = setInterval(moveSnake, 150);
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [moveSnake]);

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-black/40 backdrop-blur-md rounded-2xl border border-neon-blue/30 shadow-[0_0_20px_rgba(0,255,255,0.1)]">
      <div className="flex justify-between w-full items-center mb-2">
        <h2 className="text-2xl font-bold neon-text-blue tracking-widest uppercase">Snake</h2>
        <div className="text-xl font-mono text-neon-green">
          SCORE: <span className="neon-text-green">{score.toString().padStart(4, '0')}</span>
        </div>
      </div>

      <div 
        className="relative bg-gray-900/80 rounded-lg overflow-hidden neon-border-blue"
        style={{ 
          width: GRID_SIZE * 20, 
          height: GRID_SIZE * 20,
          display: 'grid',
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
        }}
      >
        {/* Food */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="bg-neon-pink rounded-full shadow-[0_0_10px_#ff00ff]"
          style={{
            gridColumnStart: food.x + 1,
            gridRowStart: food.y + 1,
          }}
        />

        {/* Snake */}
        {snake.map((segment, i) => (
          <div
            key={i}
            className={`${i === 0 ? 'bg-neon-blue' : 'bg-neon-blue/60'} rounded-sm shadow-[0_0_5px_#00ffff]`}
            style={{
              gridColumnStart: segment.x + 1,
              gridRowStart: segment.y + 1,
            }}
          />
        ))}

        {/* Overlays */}
        {(gameOver || isPaused) && (
          <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center backdrop-blur-sm z-10">
            {gameOver ? (
              <>
                <h3 className="text-4xl font-bold text-neon-pink mb-4 neon-text-pink">GAME OVER</h3>
                <button 
                  onClick={resetGame}
                  className="px-6 py-2 bg-neon-blue text-black font-bold rounded-full hover:bg-white transition-colors shadow-[0_0_15px_#00ffff]"
                >
                  RETRY
                </button>
              </>
            ) : (
              <>
                <h3 className="text-3xl font-bold text-neon-blue mb-4 neon-text-blue">PAUSED</h3>
                <button 
                  onClick={() => setIsPaused(false)}
                  className="px-6 py-2 bg-neon-green text-black font-bold rounded-full hover:bg-white transition-colors shadow-[0_0_15px_#39ff14]"
                >
                  RESUME
                </button>
                <p className="mt-4 text-xs text-gray-400">Press SPACE to toggle pause</p>
              </>
            )}
          </div>
        )}
      </div>
      
      <div className="text-xs text-gray-500 mt-2 uppercase tracking-tighter">
        Use Arrow Keys to Move • Space to Pause
      </div>
    </div>
  );
}
