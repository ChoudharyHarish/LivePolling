import { usePoll } from "../context/PollContext";
import { useNavigate } from "react-router-dom";

export default function StudentStartScreen() {
  const { name, setName } = usePoll();
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/poll");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="text-center max-w-md w-full px-6">
        <div className="mb-4">
          <span className="text-sm text-white bg-purple-600 px-3 py-1 rounded-full font-medium">
            ✨ Intervue Poll
          </span>
        </div>
        <h1 className="text-3xl font-semibold text-gray-800">
          Let’s <span className="font-bold">Get Started</span>
        </h1>
        <p className="text-gray-500 mt-2">
          If you’re a student, you’ll be able to{" "}
          <strong>submit your answers</strong>, participate in live polls, and
          see how your responses compare with your classmates.
        </p>
        <div className="mt-6 text-left">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Enter your Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Rahul Bajaj"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <button
          onClick={handleContinue}
          className="mt-6 w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 rounded-full text-lg font-medium hover:opacity-90 transition"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
