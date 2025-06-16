const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

let currentPoll = null;
let responses = new Map(); // socket.id -> { name, answer }
let cnt = 1;

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  // Student joins the poll
  socket.on("join-poll", () => {
    console.log("Student joined poll:", socket.id);
    if (currentPoll) {
      socket.emit("poll:new_question", currentPoll);
      emitAggregatedResults();
    }
  });

  // Teacher creates a new poll
  socket.on(
    "teacher:create_poll",
    ({ question, options, correctOption, timer }) => {
      console.log("Creating poll:", question, options, correctOption, timer);

      currentPoll = {
        id: cnt++,
        question,
        options,
        correctOption,
        timer,
        startTime: Date.now(),
      };

      responses.clear();
      io.emit("poll:new_question", currentPoll);

      setTimeout(() => {
        console.log("Poll ended, emitting results");
        emitAggregatedResults();
        currentPoll = null;
      }, timer * 1000); // timer is in seconds
    }
  );

  // Student submits an answer
  socket.on("student:submit_answer", ({ name, answer }) => {
    if (currentPoll && !responses.has(socket.id)) {
      responses.set(socket.id, { name, answer });
      emitAggregatedResults();
      console.log(`Answer received from ${name}: ${answer}`);
    }
  });

  // Clean up on disconnect
  socket.on("disconnect", () => {
    responses.delete(socket.id);
  });
});

function emitAggregatedResults() {
  const countMap = {};
  for (const { answer } of responses?.values()) {
    if (!countMap[answer]) countMap[answer] = 0;
    countMap[answer]++;
  }
  io.emit("poll:update_results", countMap);
}

app.get("/", (req, res) => {
  res.send("Socket.IO Polling Server is running");
});

server.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});
