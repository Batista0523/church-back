const express = require("express");
const cors = require("cors");
const app = express();

// const eventControllers = require("./controllers/eventControllers,js");

app.use(cors());
app.use(express.json());

// app.use("events", eventControllers);

app.get("/", (req, res) => {
  res.send("Welcome to event /events to see info");
});

app.get("*", (req, res) => {
  res.status((404).json({ success: false, data: { error: "page not found" } }));
});


module.exports = app