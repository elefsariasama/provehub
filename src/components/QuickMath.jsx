import { useEffect, useState } from "react";

export default function QuickMath({ onClose }) {
  const [score, setScore] = useState(() => {
    const saved = localStorage.getItem("quickMathScore");
    return saved ? parseInt(saved) : 0;
  });
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState(0);
  const [input, setInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(5);
  const [timer, setTimer] = useState(null);

  const generateQuestion = () => {
    const a = Math.floor(Math.random() * 10);
    const b = Math.floor(Math.random() * 10);
    setQuestion(`${a} + ${b}`);
    setAnswer(a + b);
    setInput("");
    setTimeLeft(5);
  };

  const checkAnswer = () => {
    if (parseInt(input) === answer) {
      const newScore = score + 1;
      setScore(newScore);
      localStorage.setItem("quickMathScore", newScore);
    }
    generateQuestion();
  };

  useEffect(() => {
    generateQuestion();

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          checkAnswer();
          return 5;
        }
        return prev - 1;
      });
    }, 1000);

    setTimer(interval);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[320px] bg-white/90 border border-gray-400 rounded-lg shadow-lg p-4 text-center z-50">
      <h2 className="text-xl font-bold mb-2">🧠 Quick Math</h2>
      <p className="text-sm text-gray-700">Solve before time runs out!</p>

      <div className="text-2xl mt-4 mb-2">{question}</div>
      <input
        type="number"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border p-1 w-20 text-center rounded"
      />
      <div className="mt-2 text-xs text-gray-600">⏱️ {timeLeft} sec</div>

      <p className="mt-3 font-mono">Score: {score}</p>

      <button
        onClick={onClose}
        className="mt-4 text-xs text-gray-600 underline hover:text-black"
      >
        Close Game
      </button>
    </div>
  );
}
