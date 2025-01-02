const net = require("net");

const server = net.createServer();

// all new sockets(clients) will pushed in to this array
const clients = [];

// everytime new connection happens --> this connection event get triggered

server.on("connection", (socket) => {
  const clientId = clients.length + 1;
  socket.write(`id-${clientId}`);
  // everytime data comes from a connection, this data event will get triggered
  socket.on("data", (data) => {
    const dataString = data.toString("utf8");
    const id = dataString.substring(0, dataString.indexOf("-"));
    const message = dataString.substring(dataString.indexOf("-message-") + 9);
    clients.map((client) => {
      client.socket.write(`> User: ${id} : ${message}`);
    });
  });
  clients.push({ id: clientId, socket });
});

server.listen(3008, "127.0.0.1", () => {
  console.log("server open on", server.address());
});
