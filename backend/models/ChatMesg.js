const mongoose=require('mongoose')
const {Schema} = mongoose;
const chatSchema = new Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user',
  },
  username:String,
  msg:{
    type:String,
    require:true
  },
  time:{
    type:Date,
    default:Date.now
  }
});

module.exports = mongoose.model('chatmsg',chatSchema)