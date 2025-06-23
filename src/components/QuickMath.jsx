import { useEffect, useState } from "react";

export default function QuickMath({ onClose }) {
  const [score, setScore] = useState(() => {
    const saved = localStorage.getItem("quickMathScore");
    return saved ? parseInt(saved) : 0;
  });
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState(0);
  const [input, setInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(10);
  const [feedback, setFeedback] = useState("");

  const generateQuestion = () => {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    setQuestion(`${a} + ${b}`);
    setAnswer(a + b);
    setInput("");
    setTimeLeft(10);
    setFeedback("");
  };

  const handleSubmit = () => {
    if (parseInt(input) === answer) {
      const newScore = score + 1;
      setScore(newScore);
      localStorage.setItem("quickMathScore", newScore);
      setFeedback("✅ Correct!");
    } else {
      setFeedback(`❌ Wrong! Correct answer: ${answer}`);
    }

    // Tunda soal baru agar feedback terlihat
    setTimeout(() => {
      generateQuestion();
    }, 1000);
  };

  useEffect(() => {
    generateQuestion();

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setFeedback(`⏰ Time's up! Correct answer: ${answer}`);
          setTimeout(() => generateQuestion(), 1000);
          return 10;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[340px] bg-[#1e1e2f] border border-gray-700 rounded-lg shadow-xl p-5 text-center text-white z-50">
      <h2 className="text-xl font-bold mb-1">🧠 Quick Math</h2>
      <p className="text-sm text-gray-300">Solve the question before time runs out!</p>

      <div className="text-3xl font-mono my-5">{question}</div>

      <input
        type="number"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Your answer"
        className="px-3 py-2 text-lg w-28 text-center bg-white text-black rounded-md border border-gray-300 focus:outline-none"
      />

      <button
        onClick={handleSubmit}
        className="ml-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition"
      >
        Submit
      </button>

      <div className="mt-3 text-sm text-yellow-300 font-semibold">{feedback}</div>

      <div className="mt-2 text-xs text-gray-400">⏱️ Time left: {timeLeft}s</div>

      <div className="mt-4 text-sm">
        🏆 Score: <span className="font-bold">{score}</span>
      </div>

      <button
        onClick={onClose}
        className="mt-4 text-xs text-gray-400 underline hover:text-white"
      >
        Close Game
      </button>
    </div>
  );
}
