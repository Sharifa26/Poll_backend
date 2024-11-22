const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const mongoConnect = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL, { retryWrites: true, w: 'majority',});
    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    console.error("Could not connect to MongoDB...", error.message);
  }
};
module.exports = mongoConnect;