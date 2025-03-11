const { createServer } = require("node:http");
const app = require("./app");
const port = process.env.PORT || 5000;

const server = createServer(app);

server.listen(port, () => {
  console.log(`Server is running from port no ${port}`);
});
