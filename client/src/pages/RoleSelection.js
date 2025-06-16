import { useNavigate } from "react-router-dom";
import icon from "../icons/star.svg";
import { useState } from "react";
import Header from "../components/Header";
import { usePoll } from "../context/PollContext";

export default function RoleSelection() {
  const { role, setRole } = usePoll();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 bg-white">
      <Header />
      <h1 className="text-3xl mb-2 text-center">
        Welcome to the{" "}
        <span className="font-extrabold">Live Polling System</span>
      </h1>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        Please select the role that best describes you to begin using the live
        polling system
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 w-full max-w-2xl">
        <div
          onClick={() => setRole("student")}
          className={`p-6 rounded-xl border cursor-pointer transition ${
            role === "student"
              ? "border-violet-500 shadow-md"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <h2 className="font-semibold text-lg mb-2">I’m a Student</h2>
          <p className="text-gray-500 text-sm">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry
          </p>
        </div>

        <div
          onClick={() => setRole("teacher")}
          className={`p-6 rounded-xl border cursor-pointer transition ${
            role === "teacher"
              ? "border-violet-500 shadow-md"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <h2 className="font-semibold text-lg mb-2">I’m a Teacher</h2>
          <p className="text-gray-500 text-sm">
            Submit answers and view live poll results in real-time.
          </p>
        </div>
      </div>

      <button
        disabled={!role}
        className="disabled-opacity-0.5 px-6 py-2 rounded-full text-white"
        style={{
          background: "linear-gradient(to right, #8F64E1, #1D68BD)",
        }}
        onClick={() => {
          navigate(role === "student" ? "/student" : "/create-poll");
        }}
      >
        Continue
      </button>
    </div>
  );
}
