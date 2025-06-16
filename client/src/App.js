import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoleSelection from "./pages/RoleSelection";
import StudentPage from "./pages/StudentPage";
import Poll from "./pages/Pollnew";
import CreatePoll from "./pages/CreatePoll";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RoleSelection />} />
        <Route path="/create-poll" element={<CreatePoll />} />
        <Route path="/student" element={<StudentPage />} />
        <Route path="/poll" element={<Poll />} />
      </Routes>
    </Router>
  );
}

export default App;
