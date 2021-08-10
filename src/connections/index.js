const app = require("express")();
const server = require("http").Server(app);
const PORT = process.env.PORT || 3000;
require("./database-connection");

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports.app = app;
module.exports.server = server;
