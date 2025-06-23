import { useEffect, useRef, useState } from "react";

export default function MiniMario({ onClose }) {
  const gameRef = useRef(null);
  const [position, setPosition] = useState({ x: 50, y: 240 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [isJumping, setIsJumping] = useState(false);

  const gravity = 0.6;
  const jumpStrength = -10;
  const groundY = 240;
  const moveSpeed = 3;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "ArrowLeft") {
        setVelocity((v) => ({ ...v, x: -moveSpeed }));
      }
      if (e.code === "ArrowRight") {
        setVelocity((v) => ({ ...v, x: moveSpeed }));
      }
      if (e.code === "Space" || e.code === "ArrowUp") {
        if (!isJumping) {
          setVelocity((v) => ({ ...v, y: jumpStrength }));
          setIsJumping(true);
        }
      }
    };

    const handleKeyUp = (e) => {
      if (["ArrowLeft", "ArrowRight"].includes(e.code)) {
        setVelocity((v) => ({ ...v, x: 0 }));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isJumping]);

  useEffect(() => {
    const loop = setInterval(() => {
      setPosition((prev) => {
        let newX = prev.x + velocity.x;
        let newY = prev.y + velocity.y;
        let newVy = velocity.y + gravity;

        // Batas layar
        newX = Math.max(0, Math.min(360, newX));

        // Cek tanah
        if (newY >= groundY) {
          newY = groundY;
          newVy = 0;
          setIsJumping(false);
        }

        setVelocity((v) => ({ ...v, y: newVy }));
        return { x: newX, y: newY };
      });
    }, 30);

    return () => clearInterval(loop);
  }, [velocity]);

  return (
    <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-blue-200 border border-black w-[400px] h-[300px] z-50 rounded-xl overflow-hidden">
      <div className="w-full h-full relative bg-gradient-to-t from-green-400 via-blue-100 to-sky-200">
        {/* Ground */}
        <div className="absolute bottom-0 left-0 h-[60px] w-full bg-green-700 border-t-4 border-green-900" />

        {/* Player */}
        <div
          className="absolute w-[24px] h-[30px] bg-red-600 rounded-sm border-2 border-white"
          style={{
            left: position.x,
            top: position.y,
          }}
        />

        {/* Platform Block */}
        <div className="absolute w-[60px] h-[20px] bg-yellow-400 border-2 border-yellow-600 left-[200px] top-[180px]"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 px-2 py-1 text-xs bg-white text-black rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}
