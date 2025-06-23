import { useEffect, useState } from "react";

export default function Desktop() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("username");
    if (!stored) {
      window.location.href = "/";
    } else {
      setUsername(stored);
    }
  }, []);

  return (
    <div className="h-screen w-screen bg-[url('https://wallpapercave.com/wp/wp8784260.jpg')] bg-cover bg-center relative overflow-hidden">
      {/* Taskbar */}
      <div className="absolute bottom-0 left-0 w-full flex items-center justify-center gap-6 py-2 backdrop-blur-md bg-white/30 shadow-lg rounded-t-xl">
        {/* X Link */}
        <a
          href="https://x.com/succinct" // ganti ke profil X Succinct
          target="_blank"
          className="hover:scale-110 transition"
        >
          <img src="https://abs.twimg.com/icons/apple-touch-icon-192x192.png" alt="X" className="w-8 h-8" />
        </a>

        {/* Discord Link */}
        <a
          href="https://discord.gg/succinct" // ganti ke link Discord Succinct
          target="_blank"
          className="hover:scale-110 transition"
        >
          <img src="https://cdn.worldvectorlogo.com/logos/discord-6.svg" alt="Discord" className="w-8 h-8" />
        </a>

        {/* Username */}
        <div className="text-white text-sm bg-black/40 px-4 py-1 rounded-full font-mono">
          👤 {username}
        </div>
      </div>

      {/* Desktop area (kosong dulu, nanti untuk game icons) */}
      <div className="p-4 pt-6 text-white">
        <h1 className="text-2xl font-bold drop-shadow-lg">Welcome, {username}!</h1>
        <p className="drop-shadow-md">Your MacOS-like desktop is ready 😎</p>
      </div>
    </div>
  );
}
