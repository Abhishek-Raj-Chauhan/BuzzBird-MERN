const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

// Dummy database to store OTPs (replace this with a proper database)
const otpDatabase = {};

// Send OTP to the user's email
router.post("/sendOTP", (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
  otpDatabase[email] = otp; // Store OTP in database

  // Send OTP via email
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "abhi9411917368@gmail.com", // Replace with your email
      pass: "lhbk ziga zgbp etkt", // Replace with your password
    },
  });

  const mailOptions = {
    from: "abhi9411917368@gmail.com",
    to: email,
    subject: "OTP Verification",
    text: `Your OTP for verification is: ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).send("Error sending OTP");
    } else {
      console.log("Email sent:", info.response);
      res.status(200).send("OTP sent successfully");
    }
  });
});

// Verify OTP
router.post("/verifyOTP", (req, res) => {
  const { email, otp } = req.body;
  if (otpDatabase[email] && otpDatabase[email] == otp) {
    // OTP is valid
    delete otpDatabase[email]; // Remove OTP from database after verification
    res.status(200).send("OTP verified successfully");
  } else {
    // Invalid OTP
    res.status(400).send("Invalid OTP");
  }
});

module.exports=router;