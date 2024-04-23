import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    Name: {
      type: String,
      required: true,
      unique: true,
   },
   Address: {
      type: String,
      required: false,
   },
   phoneNumber: {
      type: String,
      required: false,

   },
   Email: {
      type: String,
      required: true,
      unique: true,
   },
   Gender: {
      type: String,
      required: false,

   },
   Age: {
      type: String,
      required: false,

   },
   desc: {
      type: String,
      required: false,

   },
   Password: {
      type: String,
      default: true,

   },
},
   {
      timestamps: true,
   });

export default mongoose.model("Customers", userSchema);