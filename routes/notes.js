const notes = require("express").Router();
const { readFromFile, readAndAppend, writeToFile  } = require("../helpers/fsUtils");
const uuid = require("../helpers/uuid");

// GET Route for retrieving all the notes
notes.get("/", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new UX/UI notes
notes.post("/", (req, res) => {
  const { title, text } = req.body;
  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    readAndAppend(newNote, "./db/db.json");
    res.json(`Note added successfully 🚀`);
  } else {
    res.error("Error in adding note");
  }
});

// DELETE route for UX/UI notes
notes.delete("/:id", (req, res) => {
    const noteId = req.params.id;
    readFromFile("./db/db.json")
      .then((data) => JSON.parse(data))
      .then((json) => {
        const result = json.filter((note) => note.id !== noteId);
        writeToFile("./db/db.json", result);
        res.json(`Note ${noteId} has been deleted 🚀`);
      });
  });

module.exports = notes;
