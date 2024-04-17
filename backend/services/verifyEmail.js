const expressAsyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const Otp = require("../models/otp");
dotenv.config();

const verifyEmail = expressAsyncHandler(async (req, res) => {
  const { otp } = req.body;
  console.log(otp);
  try {
    // Find OTP entry in the database
    let success=false;
    const otpEntry = await Otp.findOne({ otp: otp });
    if (otpEntry) {
      // OTP is valid
      success=true;
      await Otp.deleteMany({}); // Remove OTP from database after verification
      res.status(200).send("OTP verified successfully");
    } else {
      // Invalid OTP
      success=false;
      res.status(400).send("Invalid OTP");
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).send("Error verifying OTP");
  }

});

module.exports = { verifyEmail };
