const express = require("express");

const {
  getAllEvents,
  getOneEvent,
  deleteEvent,
  updateEvent,
  createEvent,
} = require("../query/event.js");

const events = express.Router();

events.get("/:id", async (req, res) => {
  const { id } = req.params;
  const oneEvent = await getOneEvent(id);
  if (oneEvent) {
    res.json(oneEvent);
  } else {
    res.status(404).json({ error: "Not Found" });
  }
});



events.get("/", async (req, res) => {
  console.log("GET Request received for all items.");
  const allEvents = await getAllEvents();
  if (allEvents[0]) {
    res.status(200).json({ success: true, data: { payload: allEvents } });
  } else {
    res.status(400).json({ success: false, data: { error: "Server Error" } });
  }
});

events.post("/", async (req, res) => {
  try {
    const createdEvent = await createEvent(req.body);
    res.json(createdEvent);
  } catch (error) {
    res.status(404).json({ error: "Oh cannot created it" });
  }
});

events.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`DELETE request for item at id ${id} recieved.`);
    const deletedEvent = await deleteEvent(id);
    if (deletedEvent) {
      res.status(200).json({ success: true, data: { deletedEvent } });
    } else {
      res.status(404).json("Event Not Found");
    }
  } catch (err) {
    res.send(err);
  }
});

events.put("/:id", async (req, res) => {
    const { id } = req.params;
    console.log(`PUT request for item at id ${id} received.`);
    
    try {
      const updatedEvent = await updateEvent(id, req.body);
  
      if (updatedEvent) {
        res.status(200).json(updatedEvent);
      } else {
        res.status(404).json("No event found with that id");
      }
    } catch (error) {
      console.error("Error updating event:", error);
      res.status(500).json("Internal Server Error");
    }
  });
  

module.exports = events;
