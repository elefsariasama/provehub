import { useEffect, useState } from "react";

export default function QuickMath({ onClose }) {
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [questionCount, setQuestionCount] = useState(0);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState(0);
  const [input, setInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(10);
  const [timerStart, setTimerStart] = useState(Date.now());
  const [feedback, setFeedback] = useState("");
  const [showResult, setShowResult] = useState(false);

  const maxQuestions = 10;
  const maxRounds = 3;

  const getMaxNumber = () => 10 + round * 10;

  const generateQuestion = () => {
    const a = Math.floor(Math.random() * getMaxNumber()) + 1;
    const b = Math.floor(Math.random() * getMaxNumber()) + 1;
    setQuestion(`${a} + ${b}`);
    setAnswer(a + b);
    setInput("");
    setTimeLeft(10);
    setTimerStart(Date.now());
    setFeedback("");
    setQuestionCount(prev => prev + 1);
  };

  const handleSubmit = () => {
    const timeUsed = (Date.now() - timerStart) / 1000;
    let earned = 0;

    if (parseInt(input) === answer) {
      earned = Math.max(1, Math.floor(10 - timeUsed)); // minimal 1 point, max 10
      setFeedback(`✅ Correct! +${earned} pts`);
    } else {
      setFeedback(`❌ Wrong! Answer: ${answer}`);
    }

    setScore(prev => prev + earned);

    setTimeout(() => {
      if (questionCount >= maxQuestions) {
        setShowResult(true);
      } else {
        generateQuestion();
      }
    }, 1000);
  };

  useEffect(() => {
    generateQuestion();

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleSubmit(); // auto submit if timeout
          return 10;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [round]);

  const shareToX = () => {
    const url = encodeURIComponent("https://provehub.vercel.app");
    const text = encodeURIComponent(
      `I scored ${score} in Quick Math (Round ${round}) on Succinct OS! 🧠🔥\nTry it here:`
    );
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
  };

  const nextRound = () => {
    setRound(round + 1);
    setQuestionCount(0);
    setScore(0);
    setShowResult(false);
    generateQuestion();
  };

  return (
    <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[340px] bg-[#1e1e2f] border border-gray-700 rounded-lg shadow-xl p-5 text-center text-white z-50">
      <h2 className="text-xl font-bold mb-1">🧠 Quick Math</h2>
      <p className="text-sm text-gray-300">Round {round} / {maxRounds}</p>

      {showResult ? (
        <>
          <div className="text-xl mt-5 font-bold">🏁 Round Complete!</div>
          <p className="mt-2 text-sm">Score: <span className="font-mono">{score}</span></p>

          <div className="flex flex-col gap-2 mt-4">
            {round < maxRounds && (
              <button
                onClick={nextRound}
                className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded"
              >
                Next Round 🔁
              </button>
            )}
            <button
              onClick={shareToX}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Share to X
            </button>
            <button
              onClick={onClose}
              className="text-sm text-gray-400 underline hover:text-white mt-2"
            >
              Close Game
            </button>
          </div>
        </>
      ) : (
        <>
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
            className="ml-3 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm transition"
          >
            Submit
          </button>

          <div className="mt-3 text-sm text-yellow-300 font-semibold">{feedback}</div>
          <div className="mt-2 text-xs text-gray-400">⏱️ Time left: {timeLeft}s</div>
          <div className="mt-3 text-sm">
            Score: <span className="font-bold">{score}</span> | Question {questionCount} / {maxQuestions}
          </div>

          <button
            onClick={onClose}
            className="mt-4 text-xs text-gray-400 underline hover:text-white"
          >
            Close Game
          </button>
        </>
      )}
    </div>
  );
}
