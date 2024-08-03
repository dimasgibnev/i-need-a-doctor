import mongoose from "mongoose";

const RequestSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  problem: {
    type: String,
    required: true,
  },
},
{
  timestamps: true
});

export default mongoose.model("Request", RequestSchema)