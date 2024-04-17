const mongoose = require('mongoose');
const { Schema } = mongoose;

const otpSchema = new Schema({
  otp: {
    type: String,
    required: true,
  },
});

const Otp = mongoose.model('Otp', otpSchema);

module.exports = Otp;