import React from "react";

export default function PollOption({
  option,
  index,
  selected,
  onSelect,
  showResults,
  votes = 0,
  totalVotes = 0,
}) {
  const percentage = totalVotes ? Math.round((votes / totalVotes) * 100) : 0;
  const isSelected = selected === option;

  return (
    <div
      className={`relative w-full rounded-lg overflow-hidden border ${
        showResults ? "cursor-default" : "cursor-pointer hover:bg-gray-100"
      } mb-3 transition`}
      onClick={() => !showResults && onSelect(option)}
    >
      <div className="flex items-center relative z-10 px-4 py-3">
        <div
          className={`h-7 w-7 flex items-center justify-center rounded-full text-white font-semibold mr-3 ${
            isSelected ? "bg-purple-600" : "bg-gray-400"
          }`}
        >
          {index + 1}
        </div>
        <div className="flex-1 font-medium text-sm sm:text-base">{option}</div>
        {showResults && (
          <div className="text-sm font-semibold text-gray-800">
            {percentage}%
          </div>
        )}
      </div>

      {showResults && (
        <div
          className="absolute top-0 left-0 h-full bg-purple-500 transition-all"
          style={{ width: `${percentage}%`, zIndex: 0 }}
        ></div>
      )}

      <div className="absolute top-0 left-0 h-full w-full border border-purple-300 rounded-lg pointer-events-none"></div>
    </div>
  );
}
