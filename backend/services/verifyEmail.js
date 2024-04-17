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
      await Otp.deleteMany({}); // Remove OTP from database after verification
      res.status(200).json({ success: true, message: "OTP verified successfully" });
    } else {
      // Invalid OTP
      res.status(400).json({ success: false, message: "Invalid OTP" });
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ success: false, message: "Error verifying OTP" });
  }

});

module.exports = { verifyEmail };
