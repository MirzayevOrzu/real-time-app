const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const classroomSchema = new Schema({
    name: String,
    _type: {
        type: String,
        enum: ["public", "private"],
        default: "public",
    },
    admin: {
        id: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        name: String,
    }
})

module.exports = mongoose.model("Classroom", classroomSchema);