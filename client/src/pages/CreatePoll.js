import React, { useState } from "react";
import { socket, usePoll } from "../context/PollContext";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function CreatePoll() {
  const navigate = useNavigate();

  const [poll, setPoll] = useState({
    question: "",
    correctOption: [false],
    options: [""],
    timer: 15,
  });

  const handleOptionChange = (value, index) => {
    const updated = [...poll.options];
    updated[index] = value;
    setPoll((prev) => ({
      ...prev,
      options: updated,
    }));
  };

  const handleCorrectChange = (index, value) => {
    const updatedCorrects = [...poll.correctOption];
    updatedCorrects[index] = value;
    setPoll((prev) => ({
      ...prev,
      correctOption: updatedCorrects,
    }));
  };

  const addOption = () => {
    setPoll((prev) => ({
      ...prev,
      options: [...prev.options, ""],
      correctOption: [...prev.correctOption, false],
    }));
  };

  const handleAskQuestion = () => {
    socket.emit("teacher:create_poll", poll);
    navigate("/poll");
  };

  return (
    <div className="min-h-screen bg-white px-6 py-10 flex flex-col items-center">
      <div className="w-full max-w-3xl">
        <div className="w-fit">
          <Header />
        </div>

        <h1 className="text-3xl">
          Let’s <span className="font-bold">Get Started</span>
        </h1>
        <p className="text-gray-500 mt-2 mb-6">
          you’ll have the ability to create and manage polls, ask questions, and
          monitor your students' responses in real-time.
        </p>

        <div className="flex flex-col justify-between items-start gap-4 mb-4">
          <div className="flex justify-between w-full items-end">
            <label className="block text-lg font-bold text-gray-700 mb-1 ">
              Enter your question
            </label>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Timer
              </label>
              <select
                value={poll.timer}
                onChange={(e) =>
                  setPoll((prev) => ({
                    ...prev,
                    timer: Number(e.target.value),
                  }))
                }
                className="border px-3 py-2 rounded-md bg-gray-100"
              >
                {[15, 30, 45, 60, 90, 120].map((t) => (
                  <option key={t} value={t}>
                    {t} seconds
                  </option>
                ))}
              </select>
            </div>
          </div>
          <textarea
            value={poll?.question}
            onChange={(e) =>
              setPoll((prev) => ({
                ...prev,
                question: e.target.value,
              }))
            }
            maxLength={100}
            className="w-full border px-4 py-2 rounded-md bg-gray-100"
            rows={4}
            placeholder="Type your question..."
          />
          <div className="text-right text-sm text-gray-400 mt-1">
            {poll?.question.length}/100
          </div>
        </div>

        <div className="mt-6">
          {/* Header Row */}
          <div className="flex gap-4 mb-2">
            <h3 className="text-gray-700 font-bold w-3/4">Edit Options</h3>
            <h3 className="text-gray-700 font-bold w-1/4">Is it correct?</h3>
          </div>

          {poll.options.map((opt, index) => (
            <div key={index} className="flex gap-4 mb-3">
              <div className="flex items-center gap-3 w-3/4">
                <div className="h-6 w-6 flex items-center justify-center text-sm font-semibold text-white rounded-full bg-purple-600">
                  {index + 1}
                </div>
                <input
                  type="text"
                  placeholder="Enter your option"
                  value={opt}
                  onChange={(e) => handleOptionChange(e.target.value, index)}
                  className="flex-grow px-4 py-2 bg-gray-100 rounded-md border"
                />
              </div>

              <div className="flex gap-4 w-1/4 items-center">
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    name={`correctOption-${index}`}
                    checked={poll.correctOption[index] === true}
                    onChange={() => handleCorrectChange(index, true)}
                  />
                  Yes
                </label>
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    name={`correctOption-${index}`}
                    checked={poll.correctOption[index] === false}
                    onChange={() => handleCorrectChange(index, false)}
                  />
                  No
                </label>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={addOption}
          className="mt-2 px-4 py-1 border border-purple-500 text-purple-600 rounded-md text-sm hover:bg-purple-50"
        >
          + Add More option
        </button>
      </div>

      <div className="w-full text-right mt-10">
        <button
          onClick={handleAskQuestion}
          className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-full font-medium text-lg"
        >
          Ask Question
        </button>
      </div>
    </div>
  );
}
