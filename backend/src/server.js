const http = require("http");
const app = require("./app");
const {port} = require("./secret");

const server = http.createServer(app);

server.listen(port,()=>{
  console.log(`Server is running from port ${port}`)
})