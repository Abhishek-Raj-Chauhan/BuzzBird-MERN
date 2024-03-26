const express = require("express");
const router = express.Router();
var fetchUser = require("../middleware/fetchUser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

//1. End Point 1 - Get [logged-in User] notes details - Using GET "/api/notes/fetchallNotes" - Login required
//Basic function of this router is to fetch all the existing notes of current user
router.get("/fetchallNotes", fetchUser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server error occured");
  }
});

//2. End Point 2 - Add a new note - Using Post "/api/notes/addNote" - Login required

router.post(
  "/addNote",
  fetchUser,
  [
    //Validating Note using express validator

    body("title", "Please enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      //If there are errors, return bad request and the errors

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      //decstructing concept
      const { title, description, tag} = req.body;
      //Adding a new Note
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server error occured");
    }
  }
);

//3. End Point 3 - Update existing note - Using Put "/api/notes/updateNote" - Login required

router.put("/updateNote/:id", fetchUser, async (req, res) => {
  try {
    let success=false;
    //decstructing concept
    const { title, description, tag} = req.body;
    //Creating a new Note object
    const newNote = {};

    //inside this new note object i,ve added whatever i want to update
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    //find the note to be updated

    let note = await Note.findById(req.params.id);
    //If note does not exist
    if (!note) {
      success=false;
      return res.status(404).send(success,"Not Found");
    }
    //if unauthorised user trying to update
    if (note.user.toString() != req.user.id) {
      success=false;
      return res.status(401).send(success,"Not Allowed");
    }
    //Update the note
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    success=true;
    res.json({ success,note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server error occured");
  }
});

//4. End Point 4 - Delete existing note - Using Delete "/api/notes/deleteNote" - Login required

router.delete("/deleteNote/:id", fetchUser, async (req, res) => {
  try {
    //find the note to be deleted

    let note = await Note.findById(req.params.id);
    //If note does not exist
    if (!note) {
      return res.status(404).send("Not Found");
    }
    //if unauthorised user trying to delete
    if (note.user.toString() != req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    //Delete the note
    note = await Note.findByIdAndDelete(req.params.id);
    res.json("Note deleted successfully");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server error occured");
  }
});

module.exports = router;
