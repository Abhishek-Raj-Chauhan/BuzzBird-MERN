const ConnectToMongo = require("./db");
const express = require("express");
const cors = require('cors');
const dotenv = require('dotenv');

ConnectToMongo();

const app = express();
dotenv.config();
const port = process.env.PORT || 4000;

// Available Routes
app.use(express.json());
app.use(bodyParser.json());
// Configure CORS to allow requests from specific origin
const corsOptions = {
  origin: 'https://cozynotes-mern-1.onrender.com'
};
app.use(cors(corsOptions));

app.use('/api/auth', require('./routes/auth.js'));
app.use('/api/notes', require('./routes/notes.js'));
app.use('/api/chatmsg', require('./routes/chatmsg.js'));

app.get("/", (req, res) => {
  res.send("Hello Abhishek!");
});

app.listen(port, '0.0.0.0', () => {
  console.log(`CozyNotes Backend listening at http://'0.0.0.0':${port}`);
});
