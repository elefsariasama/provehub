import { useState, useEffect, useRef } from "react";

export default function FlappyBird({ onClose }) {
  const [birdPosition, setBirdPosition] = useState(200);
  const [gravity, setGravity] = useState(3);
  const [obstacleLeft, setObstacleLeft] = useState(400);
  const [obstacleHeight, setObstacleHeight] = useState(100);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const gameBoxHeight = 400;
  const gameBoxWidth = 400;
  const birdSize = 20;
  const obstacleWidth = 40;
  const gap = 140;

  const gameLoopRef = useRef(null);

  const handleJump = () => {
    if (!gameOver && birdPosition > 0) {
      setBirdPosition((pos) => Math.max(pos - 60, 0));
    }
  };

  useEffect(() => {
    const handleSpace = (e) => {
      if (e.code === "Space") handleJump();
    };
    window.addEventListener("keydown", handleSpace);
    return () => window.removeEventListener("keydown", handleSpace);
  }, []);

  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      setBirdPosition((prev) => {
        const next = prev + gravity;
        if (next >= gameBoxHeight - birdSize) {
          setGameOver(true);
          return prev;
        }
        return next;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [gameOver]);

  useEffect(() => {
    if (gameOver) return;

    if (obstacleLeft < -obstacleWidth) {
      setObstacleLeft(gameBoxWidth);
      setObstacleHeight(Math.floor(Math.random() * 200));
      setScore((s) => s + 1);
    }

    const interval = setInterval(() => {
      setObstacleLeft((left) => left - 5);
    }, 30);

    return () => clearInterval(interval);
  }, [obstacleLeft, gameOver]);

  useEffect(() => {
    const topObstacleBottom = obstacleHeight;
    const bottomObstacleTop = obstacleHeight + gap;

    if (
      obstacleLeft < 50 &&
      obstacleLeft + obstacleWidth > 30 &&
      (birdPosition < topObstacleBottom || birdPosition + birdSize > bottomObstacleTop)
    ) {
      setGameOver(true);
    }
  }, [birdPosition, obstacleLeft]);

  return (
    <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-gray-900 border border-white w-[400px] h-[400px] text-white z-50 overflow-hidden rounded-xl p-2">
      <h2 className="text-center text-sm mb-1">🐤 Flappy Bird</h2>
      <div
        className="relative bg-sky-400 w-full h-full"
        onClick={handleJump}
      >
        {/* Bird */}
        <div
          className="absolute bg-yellow-300 rounded-full"
          style={{
            top: birdPosition,
            left: 30,
            width: birdSize,
            height: birdSize,
          }}
        />

        {/* Top Obstacle */}
        <div
          className="absolute bg-green-700"
          style={{
            top: 0,
            left: obstacleLeft,
            width: obstacleWidth,
            height: obstacleHeight,
          }}
        />
        {/* Bottom Obstacle */}
        <div
          className="absolute bg-green-700"
          style={{
            top: obstacleHeight + gap,
            left: obstacleLeft,
            width: obstacleWidth,
            height: gameBoxHeight - (obstacleHeight + gap),
          }}
        />

        {/* Score */}
        <div className="absolute top-2 right-2 text-white font-bold text-sm">
          Score: {score}
        </div>
        {/* Game Over */}
        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 text-white text-center">
            <div className="text-2xl font-bold">💀 Game Over</div>
            <div className="text-sm mt-2">Score: {score}</div>
            <button
              className="mt-4 px-3 py-1 bg-white text-black rounded"
              onClick={() => window.location.reload()}
            >
              Play Again
            </button>
            <button
              className="mt-2 text-xs underline text-gray-200"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
