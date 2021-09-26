const mongoose = require('mongoose');
const config = require('config');

const db = "mongodb://localhost";


const connectDB = async () =>{
  try {
    await mongoose.connect(db, {
      useNewUrlParser : true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log('mongodb connected');
  } catch (err) {
    console.err(err.message);
    process.exit(1);
  }

}



module.exports = connectDB;
