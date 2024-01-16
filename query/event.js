
const db = require("../db/dbConfig.js");

const getAllEvents = async () => {
  try {
    const allEvent = await db.any("SELECT * FROM events");
    console.log("Data retrieved from database", allEvent);
    return allEvent;
  } catch (err) {
    console.error("error in allEvent", err);
    throw err;
  }
};

const getOneEvent = async (id) => {
  try {
    const oneEvent = await db.one("SELECT * FROM events WHERE id=$1", id);
    return oneEvent;
  } catch (error) {
    return error;
  }
};

const createEvent = async (events) => {
  try {
    const createdEvents = await db.one(
      "INSERT INTO events(title,descriptions,pictures,schedule) VALUES($1,$2,$3,$4)RETURNING *",
      [events.title, events.descriptions, events.pictures, events.schedule]
    );
    return createdEvents;
  } catch (error) {
    return error;
  }
};

const deleteEvent = async (id) => {
  try {
    const deletedEvent = await db.one(
      "DELETE FROM events WHERE id=$1 RETURNING *",
      id
    );
    return deletedEvent;
  } catch (error) {
    return error;
  }
};

const updateEvent = async (id, events) => {
  try {
    const [title, descriptions, pictures, schedule] = events;
    const updatedEvent = await db.one(
      "UPDATE events SET title=$1,descriptions=$2,pictures=$3,schedule=$4 WHERE id=$5 RETURNING *",
      [title, descriptions, pictures, schedule, id]
    );
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllEvents,
  getOneEvent,
  deleteEvent,
  updateEvent,
  createEvent,
};
