import { useEffect, useState } from "react";
import QuickMath from "../components/QuickMath";
import CatClicker from "../components/CatClicker";

export default function Desktop() {
  const [username, setUsername] = useState("");
  const [activeGame, setActiveGame] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("username");
    if (!stored) {
      window.location.href = "/";
    } else {
      setUsername(stored);
    }
  }, []);

  return (
    <div className="w-full h-screen bg-gradient-to-br from-pink-100 to-indigo-200 cursor-pink relative overflow-hidden">
      {/* Logo tengah dengan animasi glow */}
      <img
        src="/logo-energi.png"
        alt="logo"
        className="w-40 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-glow"
      />

      {/* Ikon Desktop */}
      <div className="absolute top-6 left-6 flex flex-wrap gap-6 z-10">
        {/* QuickMath */}
        <div
          className="desktop-icon"
          onClick={() => setActiveGame("quickmath")}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/3303/3303893.png"
            alt="QuickMath"
          />
          <span>QuickMath</span>
        </div>

        {/* CatClicker */}
        <div className="desktop-icon" onClick={() => setActiveGame("cat")}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/2206/2206368.png"
            alt="CatClicker"
          />
          <span>CatClicker</span>
        </div>
      </div>

      {/* Taskbar */}
      <div className="taskbar">
        <span className="font-bold text-white">👤 {username}</span>
        <a
          href="https://x.com/succinct"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline flex items-center gap-1"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/X_logo_2023.svg"
            className="w-4 h-4"
            alt="X"
          />
          Profile X
        </a>
        <a
          href="https://discord.gg/succinct"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline flex items-center gap-1"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/3670/3670157.png"
            className="w-4 h-4"
            alt="Discord"
          />
          Join Discord
        </a>
      </div>

      {/* Game Windows */}
      {activeGame === "quickmath" && (
        <div className="game-window">
          <QuickMath onClose={() => setActiveGame(null)} />
        </div>
      )}
      {activeGame === "cat" && (
        <div className="game-window">
          <CatClicker onClose={() => setActiveGame(null)} />
        </div>
      )}
    </div>
  );
}
