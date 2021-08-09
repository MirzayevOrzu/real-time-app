const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const port = 3002;
require("dotenv").config();
const mongoose = require("mongoose");
const path = require("path");
const Group = require("./models/group");
var bodyParser = require('body-parser')

const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/cocola";

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("database connection open"))
  .catch((err) => console.log("database error: ", err.message));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.urlencoded({ extended: true }));

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/", async (req, res) => {
  const groups = await Group.find({ _type: "public"});
  res.render("index", { groups });
});

app.post("/group", async (req, res) => {
  const { name, _type } = req.body;
  console.log(name, " ", _type);
  const existingGroup = await Group.findOne({ name });
  if (existingGroup) {
    res.status(400).json({
      message: `Group called "${name}" already exists` 
    })
  } else {
    const newGroup = new Group({ name, _type });
    await newGroup.save();
    res.redirect("/");
  }
})

app.get("/:groupId", async (req, res) => {
  const { groupId } = req.params;
  const group = await Group.findById(groupId); 
  res.render("group", { group });
});

app.post("/register", async (req, res) => {
  const { name, password } = req.body;
  const existingUser = await User.findOne({ name });
  if (existingUser) {
    res.status(400).json({
      message: "There is a user with that username, please try again!"
    })
  } else {
    const newUser =  new User({ name, password });    
    await newUser.save();
    res.status(200).json({
      message: "User Registered"
    })
  }
})

const tech = io.of("/tech");

tech.on("connection", (socket) => {
  socket.on("join", async (data) => {
    const { name } = await Group.findById(data.room);
    tech.in(data.room).emit("message", `new user joined in ${name} room`);
    socket.join(data.room);
  });

  socket.on("message", (data) => {
    console.log(`message: ${data.msg}`);
    tech.in(data.room).emit("message", data.msg);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    tech.emit("message", "user disconnected");
  });
});
