const expressAsyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const generateOTP = require("./generateOTP");
const Otp = require("../models/otp");
dotenv.config();

let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendEmail = expressAsyncHandler(async (req, res) => {
  const { email } = req.body;
  console.log(email);

  const otp = generateOTP();
  const otpEntry = new Otp({
    otp: otp,
  });
  await otpEntry.save();

  var mailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject: "OTP from BuzzBird 🐦‍🔥",
    html: `<p>Thank you for choosing BuzzBird 🐦‍🔥 for your note-taking needs. As requested, here is your One-Time Password (OTP) to complete the sign-up process:</p>
    <p><strong>Your OTP is: ${otp}</strong></p>
    <p>Please enter this OTP in the designated field to verify your account and gain access to our intuitive note-taking interface.</p>
    <p>At BuzzBird 🐦‍🔥, we prioritize the security and privacy of your personal information. Rest assured that your data is protected by industry-leading security measures, ensuring that only you have access to your notes.</p>
    <p>If you have any questions or need further assistance, feel free to reach out to me.</p>
    <p>Thank you for joining our community of note-takers!</p>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.status(400).json({ success: false, message: "Error Sending email" });
    } else {
      res.status(200).json({ success: true, message: "Email sent successfully" });
    }
  });
});

module.exports = { sendEmail };
