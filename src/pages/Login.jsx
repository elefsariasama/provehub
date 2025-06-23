import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username.trim()) {
      localStorage.setItem("username", username);
      navigate("/desktop");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-100 to-gray-300 text-gray-800 font-mono">
      <h1 className="text-3xl mb-6 font-semibold">Welcome to Succinct OS</h1>
      <input
        type="text"
        placeholder="Enter your X/Discord username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="px-4 py-2 border border-gray-400 rounded-md mb-4 w-80 focus:outline-none"
      />
      <button
        onClick={handleLogin}
        className="bg-black text-white px-6 py-2 rounded-md hover:opacity-90"
      >
        Login
      </button>
    </div>
  );
}
