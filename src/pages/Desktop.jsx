import { useEffect, useState } from "react";
import "../styles.css"; // untuk animasi glow

export default function Desktop() {
  const [username, setUsername] = useState("");
  const [glow, setGlow] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("username");
    if (!stored) {
      window.location.href = "/";
    } else {
      setUsername(stored);
    }

    // Stop animasi glow setelah 5 detik
    const timer = setTimeout(() => setGlow(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Logo di tengah */}
      <img
        src="/logo-energi.png"
        alt="Logo Energi"
        className={`w-52 h-52 mb-8 ${glow ? "animate-glow" : ""}`}
      />

      {/* Taskbar (dock) */}
      <div className="absolute bottom-0 left-0 w-full flex items-center justify-center gap-6 py-3 backdrop-blur-md bg-white/10 shadow-inner">
        {/* X Profile */}
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

        {/* Discord */}
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

        {/* Username Display */}
        <span className="text-white text-sm bg-black/40 px-4 py-1 rounded-full font-mono">
          👤 {username}
        </span>
      </div>
    </div>
  );
}
