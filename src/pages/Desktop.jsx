import { useEffect, useState } from "react";
import QuickMath from "../components/QuickMath";
import CatClicker from "../components/CatClicker";
import FlappyBird from "../components/FlappyBird";
import MiniMario from "../components/MiniMario";

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
      {/* Gambar tengah */}
      <img
        src="/8b20bf4a-b04f-4fff-918b-94bf7f8fea32.png"
        alt="logo"
        className="w-40 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-glow"
      />

      {/* Ikon Desktop */}
      <div className="absolute top-6 left-6 grid grid-cols-4 gap-6 z-10">
        {/* QuickMath */}
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => setActiveGame("quickmath")}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/3303/3303893.png"
            alt="QuickMath"
            className="w-12 h-12 hover:scale-110 transition"
          />
          <span className="text-xs mt-1">QuickMath</span>
        </div>

        {/* CatClicker */}
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => setActiveGame("cat")}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/2206/2206368.png"
            alt="CatClicker"
            className="w-12 h-12 hover:scale-110 transition"
          />
          <span className="text-xs mt-1">CatClicker</span>
        </div>

        {/* Flappy Bird */}
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => setActiveGame("flappy")}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/1020/1020266.png"
            alt="Flappy Bird"
            className="w-12 h-12 hover:scale-110 transition"
          />
          <span className="text-xs mt-1">Flappy</span>
        </div>

        {/* Mini Mario */}
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => setActiveGame("mario")}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/999/999772.png"
            alt="Mario"
            className="w-12 h-12 hover:scale-110 transition"
          />
          <span className="text-xs mt-1">Mario</span>
        </div>
      </div>

      {/* Taskbar */}
      <div className="absolute bottom-0 left-0 w-full flex items-center justify-center gap-6 py-3 backdrop-blur-md bg-white/10 shadow-inner text-white text-sm z-20">
        <span className="font-bold text-white">👤 {username}</span>
        <a
          href="https://x.com/succinct" target="_blank" rel="noopener noreferrer"
          className="hover:underline flex items-center gap-1"
        >
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/X_logo_2023.svg" className="w-4 h-4" />
          Profile X
        </a>
        <a
          href="https://discord.gg/succinct" target="_blank" rel="noopener noreferrer"
          className="hover:underline flex items-center gap-1"
        >
          <img src="https://cdn-icons-png.flaticon.com/512/3670/3670157.png" className="w-4 h-4" />
          Join Discord
        </a>
      </div>

      {/* Game windows */}
      {activeGame === "quickmath" && (
        <QuickMath onClose={() => setActiveGame(null)} />
      )}
      {activeGame === "cat" && (
        <CatClicker onClose={() => setActiveGame(null)} />
      )}
      {activeGame === "flappy" && (
        <FlappyBird onClose={() => setActiveGame(null)} />
      )}
      {activeGame === "mario" && (
        <MiniMario onClose={() => setActiveGame(null)} />
      )}
    </div>
  );
}
