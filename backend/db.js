const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config()
const mongoURI = process.env.MONGO_DATA_URL

// const ConnectToMongo = async()=>{
//     try {
//         await mongoose.connect(mongoURI);
//         console.log("Connected to MongoDB successfully");
//     } 
//     catch (error) {
//         console.error("Error connecting to MongoDB:", error);
//     }
// }

const ConnectToMongo = async()=>{
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB successfully");
}
module.exports = ConnectToMongo