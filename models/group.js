const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    name: String,
    _type: {
        type: String,
        enum: ["public", "private"],
        default: "public",
    }
})

module.exports = mongoose.model("Group", groupSchema);