import mongoose from "mongoose";

const { Schema } = mongoose;

const ComplainSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  ComplainID: {
    type: String,
    required: true,
  },
  ComplainType: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  reply: {
    type: String,
  },
});

const Complain = mongoose.model("Complain", ComplainSchema);

export default Complain;
