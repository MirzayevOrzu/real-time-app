require("dotenv").config();
require("./src/services/google-auth02");
const { app } = require("./src/connections");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const path = require("path");

const { Classroom } = require("./src/models");
const { userRoutes } = require("./src/routes");
const { classroomRoutes } = require("./src/routes");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

app.use(
  cookieSession({
    name: "tuto-session",
    keys: ["key1", "key2"],
    // expires: 1000 * 60 * 60,
  })
);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({}));
app.use(passport.initialize());
app.use(passport.session());

app.use("/user", userRoutes);
app.use("/classroom", classroomRoutes);

app.get("/", async (req, res) => {
  const classrooms = await Classroom.find({ _type: "public" });
  res.render("index", { classrooms, user: req.user });
});

app.all("*", (req, res) => {
  res.redirect("/");
});
