import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  // Jika sudah login, langsung redirect ke desktop
  useEffect(() => {
    const stored = localStorage.getItem("username");
    if (stored) navigate("/desktop");
  }, [navigate]);

  const handleLogin = () => {
    if (username.trim()) {
      localStorage.setItem("username", username.trim());
      navigate("/desktop");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="bg-white shadow-lg rounded-xl p-8 w-[90%] max-w-md text-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 font-mono">
          Welcome to Succinct OS
        </h1>
        <input
          type="text"
          placeholder="Enter your X/Discord username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 border border-gray-400 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-black text-center"
        />
        <button
          onClick={handleLogin}
          className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 w-full transition"
        >
          Login
        </button>
      </div>
    </div>
  );
}
