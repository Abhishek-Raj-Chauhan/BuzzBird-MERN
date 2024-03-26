const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/iNoteBook?directConnection=true&readPreference=primary'

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