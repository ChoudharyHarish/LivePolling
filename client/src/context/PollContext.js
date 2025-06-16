import React, { createContext, useState, useContext } from "react";

import io from "socket.io-client";
export const socket = io("https://livepolling-ljgq.onrender.com");

const PollContext = createContext();

export const usePoll = () => useContext(PollContext);

export const PollProvider = ({ children }) => {
  const [responses, setResponses] = useState(null); // socket.id -> { name, answer }
  const [role, setRole] = useState(null); // 'student' or 'teacher'
  const [name, setName] = useState("");

  return (
    <PollContext.Provider
      value={{
        name,
        role,
        responses,
        setRole,
        setName,
        setResponses,
      }}
    >
      {children}
    </PollContext.Provider>
  );
};
