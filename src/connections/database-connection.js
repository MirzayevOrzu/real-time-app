const mongoose = require("mongoose");
const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/cocola";

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("database connection open");
  })
  .catch((err) => {
    console.log("database error: ", err.message);
  });
