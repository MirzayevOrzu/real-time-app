const { server } = require(".");
const io = require("socket.io")(server);
const classroom = io.of("/classroom");

classroom.on("connection", (socket) => {
  socket.on("join", handleClassroomJoin);
  socket.on("message", handleClassroomMessage);
  socket.on("disconnect", handleClassroomDisconnect);

  async function handleClassroomJoin(data) {
    // what if there is no group, hmm ...
    const group = await Group.findById(data.room);
    // notify others that new user is joined in classroom
    // classroom.in(data.groupId).emit("message", "new user joined");
    socket.join(data.room);
  }

  async function handleClassroomMessage(data) {
    const { room, userId, userName, message } = data;
    classroom.in(room).emit("message", { message, by: userName });
    const user = await User.findById(userId);
    const message = new Message({
      group: room,
      author: {
        id: userId,
        name: user.displayName,
      },
      message: data.message,
    });
    await message.save();
  }

  function handleClassroomDisconnect() {
    console.log("user disconnected");
    classroom.emit("message", "user disconnected");
  }
});
