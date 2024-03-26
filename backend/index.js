const ConnectToMongo = require("./db");
const express = require("express");
const cors = require('cors')
ConnectToMongo();

const app = express();
const port = 5000;

//Available Routes
app.use(express.json())

// app.use(cors({
//   origin: ['http://localhost:3000', 'http://localhost:3000/mynotes']
// }));
app.use(cors());
app.use('/api/auth',require('./routes/auth.js'))
app.use('/api/notes',require('./routes/notes.js'))

app.get("/", (req, res) => {
  res.send("Hello Abhishek!");
});

app.listen(port, () => {
  console.log(`CozyNotes Backend listening at http://localhost:${port}`);
});
