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
    <div className="w-full h-screen bg-gradient-to-br from-[#fce4ec] to-[#d1c4e9] cursor-pink relative overflow-hidden">
      {/* Logo tengah */}
      <img
        src="/logo-energi.png"
        alt="logo"
        className="w-28 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-glow"
      />

      {/* Ikon di desktop */}
      <div className="absolute top-6 left-6 flex gap-6 z-10">
        <div className="desktop-icon" onClick={() => setActiveGame("quickmath")}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3303/3303893.png"
            alt="QuickMath"
          />
          <span>QuickMath</span>
        </div>
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
        <span className="font-bold">👤 {username}</span>
        <a href="https://x.com/succinct" target="_blank" rel="noopener noreferrer">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/X_logo_2023.svg"
            alt="X"
            className="w-4 h-4"
          />
          Profile X
        </a>
        <a href="https://discord.gg/succinct" target="_blank" rel="noopener noreferrer">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3670/3670157.png"
            alt="Discord"
            className="w-4 h-4"
          />
          Join Discord
        </a>
      </div>

      {/* Game Window */}
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
