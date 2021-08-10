const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  date: {
    type: Date,
    default: new Date(),
  },
  classId: {
    type: Schema.Types.ObjectId,
    ref: "Classroom",
    required: true,
  },
  author: {
    id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: String,
  },
  response: {
    message: {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  message: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Message", messageSchema);
