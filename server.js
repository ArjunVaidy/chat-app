const net = require("net");

const server = net.createServer();

// all new sockets(clients) will pushed in to this array
const clients = [];

server.on("connection", (socket) => {
  socket.on("data", (data) => {
    clients.map((s) => {
      s.write(data);
    });
  });
  clients.push(socket);
});

server.listen(3008, "127.0.0.1", () => {
  console.log("server open on", server.address());
});
