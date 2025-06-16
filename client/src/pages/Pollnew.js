import React, { useEffect, useState } from "react";
import { socket, usePoll } from "../context/PollContext";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import PollOption from "../components/PollOption";

export default function PollPage() {
  const navigate = useNavigate();

  const { name, role, responses, setResponses } = usePoll();

  const [selectedOption, setSelectedOption] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [poll, setPoll] = useState(null);

  useEffect(() => {
    socket.emit("join-poll");
    socket.on("poll:new_question", (poll) => {
      setPoll(poll);
      setHasSubmitted(false);
      setSelectedOption(null);

      const pollEnd = Date.now() + poll.timer * 1000;
      const interval = setInterval(() => {
        const secondsLeft = Math.max(
          0,
          Math.floor((pollEnd - Date.now()) / 1000)
        );
        setTimeLeft(secondsLeft);
        if (secondsLeft === 0) clearInterval(interval);
      }, 1000);
    });

    socket.on("poll:results", handleResponses);
    socket.on("poll:update_results", handleResponses);

    return () => {
      socket.off("poll:new_question");
      socket.off("poll:update_results");
      socket.off("poll:results");
    };
  }, []);

  const handleResponses = (responses) => {
    setResponses(responses);
  };

  const handleSubmit = () => {
    if (!selectedOption) return;
    socket.emit("student:submit_answer", { name, answer: selectedOption });
    setHasSubmitted(true);
  };

  const totalVotes = Object.values(responses || {}).reduce((a, b) => a + b, 0);

  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen bg-white relative">
      <Header />
      <div className="absolute bottom-6 right-6">
        <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center">
          💬
        </div>
      </div>

      {!poll ? (
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-purple-600 mb-4"></div>
          <p className="text-lg font-semibold text-gray-800">
            Wait for the teacher to ask questions..
          </p>
        </div>
      ) : (
        <div className="flex flex-col w-full max-w-xl">
          <div className="mb-4 flex gap-8 items-center">
            <p className="font-bold text-sm">Question {poll?.id}</p>
            <p className="text-red-500 font-semibold text-sm">
              ⏱️ 00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
            </p>
          </div>

          <div className="w-full border rounded-lg shadow-md">
            <p
              className="text-lg font-medium mb-4 text-white p-4"
              style={{
                background: "linear-gradient(to right, #343434, #6E6E6E)",
              }}
            >
              {poll.question}
            </p>

            <div className="p-6 space-y-3 mb-6">
              {poll.options.map((opt, index) => (
                <PollOption
                  key={index}
                  index={index}
                  option={opt}
                  selected={selectedOption}
                  onSelect={setSelectedOption}
                  showResults={hasSubmitted || role === "teacher"}
                  votes={responses?.[opt] || 0}
                  totalVotes={totalVotes}
                />
              ))}
            </div>
          </div>

          {role === "student" && (
            <button
              onClick={handleSubmit}
              disabled={!selectedOption}
              className="ml-auto p-4 mt-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 rounded-full text-lg font-medium hover:opacity-90 transition disabled:opacity-50"
            >
              Submit
            </button>
          )}
        </div>
      )}

      <div className="flex flex-col items-center">
        {role === "teacher" && (
          <button
            onClick={() => navigate("/create-poll")}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg text-lg font-semibold"
          >
            Ask New Question
          </button>
        )}
        {role === "student" && hasSubmitted && (
          <p className="text-lg font-semibold text-gray-800">
            Wait for the teacher to ask questions..
          </p>
        )}
      </div>
    </div>
  );
}
