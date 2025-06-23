import { useEffect, useState } from "react";
import "../styles.css";
import CatClicker from "../components/CatClicker";

export default function Desktop() {
  const [username, setUsername] = useState("");
  const [glow, setGlow] = useState(true);
  const [showGame, setShowGame] = useState(false);

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

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] relative overflow-hidden text-white font-mono">
      {/* Gambar tengah */}
      <div className="flex items-center justify-center h-full">
        <img
          src="/logo-energi.png"
          alt="Logo Energi"
          className={`w-52 h-52 ${glow ? "animate-glow" : ""}`}
        />
      </div>

      {/* Ikon Game */}
      <div className="absolute top-8 left-8 flex flex-col items-center cursor-pointer" onClick={() => setShowGame(true)}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/2203/2203187.png"
          alt="Cat Clicker"
          className="w-12 h-12 hover:scale-110 transition"
        />
        <span className="text-xs mt-1 text-white drop-shadow-md">Cat Clicker</span>
      </div>

      {/* Game popup */}
      {showGame && <CatClicker onClose={() => setShowGame(false)} />}

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
