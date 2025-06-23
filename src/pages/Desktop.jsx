import { useEffect, useState } from "react";
import "../styles.css";
import CatClicker from "../components/CatClicker";
import QuickMath from "../components/QuickMath";

export default function Desktop() {
  const [username, setUsername] = useState("");
  const [glow, setGlow] = useState(true);
  const [activeGame, setActiveGame] = useState(null);
  const [clicks, setClicks] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("username");
    if (!stored) {
      window.location.href = "/";
    } else {
      setUsername(stored);
    }

    const timer = setTimeout(() => setGlow(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      const newClick = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      };
      setClicks((prev) => [...prev, newClick]);

      setTimeout(() => {
        setClicks((prev) => prev.filter((c) => c.id !== newClick.id));
      }, 500);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <div
      className="h-screen w-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] relative overflow-hidden text-white font-mono cursor-pink"
    >
      {/* Logo di tengah */}
      <div className="flex items-center justify-center h-full pointer-events-none">
        <img
          src="/logo-energi.png"
          alt="Logo Energi"
          className={`w-52 h-52 ${glow ? "animate-glow" : ""}`}
        />
      </div>

      {/* Ikon Game: Rapi pakai grid */}
      <div className="absolute top-8 left-8 grid grid-cols-2 gap-8">
        {/* Cat Clicker */}
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => setActiveGame("cat")}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/2203/2203187.png"
            alt="Cat Clicker"
            className="w-12 h-12 hover:scale-110 transition"
          />
          <span className="text-xs mt-1">Cat Clicker</span>
        </div>

        {/* Quick Math */}
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => setActiveGame("math")}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/1157/1157109.png"
            alt="Quick Math"
            className="w-12 h-12 hover:scale-110 transition"
          />
          <span className="text-xs mt-1">Quick Math</span>
        </div>
      </div>

      {/* Game popups */}
      {activeGame === "cat" && <CatClicker onClose={() => setActiveGame(null)} />}
      {activeGame === "math" && <QuickMath onClose={() => setActiveGame(null)} />}

      {/* Taskbar */}
      <div className="absolute bottom-0 left-0 w-full flex items-center justify-center gap-6 py-3 backdrop-blur-md bg-white/10 shadow-inner">
        <a
          href="https://x.com/succinct"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 transition"
        >
          <img
            src="https://abs.twimg.com/icons/apple-touch-icon-192x192.png"
            alt="X"
            className="w-7 h-7"
          />
        </a>
        <a
          href="https://discord.gg/succinct"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 transition"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/3670/3670157.png"
            alt="Discord"
            className="w-7 h-7"
          />
        </a>
        <span className="text-white text-sm bg-black/40 px-4 py-1 rounded-full">
          👤 {username}
        </span>
      </div>

      {/* Animasi klik */}
      {clicks.map((click) => (
        <span
          key={click.id}
          className="absolute pointer-events-none w-6 h-6 bg-pink-400 rounded-full animate-ping"
          style={{
            left: click.x,
            top: click.y,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </div>
  );
}
