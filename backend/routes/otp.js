const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const Otp = require("../models/otp");

// Send OTP to the user's email
router.post("/sendOTP", async (req, res) => {
  const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP

  try {
    // Save OTP in the database
    const otpEntry = new Otp({
      otp: otp,
    });
    await otpEntry.save();

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
      to: req.body.email,
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
  } catch (error) {
    console.error("Error saving OTP:", error);
    res.status(500).send("Error saving OTP");
  }
});

// Verify OTP
router.post("/verifyOTP", async (req, res) => {
  const { otp } = req.body;

  try {
    // Find OTP entry in the database
    const otpEntry = await Otp.findOne({ otp: otp });
    if (otpEntry) {
      // OTP is valid
      await otpEntry.delete(); // Remove OTP from database after verification
      res.status(200).send("OTP verified successfully");
    } else {
      // Invalid OTP
      res.status(400).send("Invalid OTP");
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).send("Error verifying OTP");
  }
});

module.exports = router;
