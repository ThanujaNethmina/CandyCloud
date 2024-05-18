const mongoose = require("mongoose");

const dbUrl =
  "mongodb+srv://samarakoonsarith:sariya123@cluster0.ajveo9f.mongodb.net/CandyCloud?retryWrites=true&w=majority&appName=Cluster0";

//callback function
const connection = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("Mongo DB connected");
  } catch (err) {
    console.log(err.message);
    process.exit();
  }
};

module.exports = connection;
