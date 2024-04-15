const express = require("express");
const router = express.Router();
var fetchUser = require("../middleware/fetchUser");
const User = require("../models/User");
const Note = require("../models/ChatMesg");
const { body, validationResult } = require("express-validator");
const ChatMesg = require("../models/ChatMesg");

// Endpoint to fetch all notes of all users
router.get("/fetchChats", async (req, res) => {
  try {
    const chats = await ChatMesg.find();
    res.json(chats);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server error occurred");
  }
});
//2. End Point 2 - Add a new note - Using Post "/api/notes/addNote" - Login required

router.post(
  "/addChat",
  fetchUser,
  [
    //Validating Note using express validator

    body("msg", "Please enter a valid message").isLength({ min: 3 }),
  ],
  async (req, res) => {
    try {
      //If there are errors, return bad request and the errors

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      //decstructing concept
      const {msg} = req.body;
      const userId = req.user.id;
      const user = await User.findById(userId).select("name");
      const username = user.name;
      //Adding a new Chat
      const chat = new ChatMesg({
        msg,
        user: userId,
        username,
      });
      const savedChat = await chat.save();
      res.json(savedChat);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server error occured");
    }
  }
);


// //4. End Point 4 - Delete existing note - Using Delete "/api/notes/deleteNote" - Login required

// router.delete("/deleteNote/:id", fetchUser, async (req, res) => {
//   try {
//     //find the note to be deleted

//     let note = await Note.findById(req.params.id);
//     //If note does not exist
//     if (!note) {
//       return res.status(404).send("Not Found");
//     }
//     //if unauthorised user trying to delete
//     if (note.user.toString() != req.user.id) {
//       return res.status(401).send("Not Allowed");
//     }
//     //Delete the note
//     note = await Note.findByIdAndDelete(req.params.id);
//     res.json("Note deleted successfully");
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Internal Server error occured");
//   }
// });

module.exports = router;
