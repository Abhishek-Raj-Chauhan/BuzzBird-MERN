const express = require("express");
const router = express.Router();

const { sendEmail } = require("../services/sendEmail");
const { verifyEmail } = require("../services/verifyEmail");

router.post("/sendEmail", sendEmail);
router.post("/verifyEmail", verifyEmail);

module.exports = router;
