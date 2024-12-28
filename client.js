const net = require("net");

const socket = net.createConnection({
  host: "127.0.0.1",
  port: 3008,
});

socket.on("end", () => {
  console.log("connection was ended");
});
