const { createServer } = require("node:http");
const app = require("./app");
const connectToSocket = require("./controllers/socketController");
const port = process.env.PORT || 5000;

const server = createServer(app);

connectToSocket(server);

server.listen(port, () => {
  console.log(`Server is running from port no ${port}`);
});
