const net = require("net");

const server = net.createServer();

// all new sockets(clients) will pushed in to this array
const clients = [];

// everytime new connection happens --> this connection event get triggered

server.on("connection", (socket) => {
  const clientId = clients.length + 1;

  // when some one joins - we will broadcast to all
  clients.map((client) => {
    client.socket.write(`User ${clientId} joined`);
  });

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

  // for exit of client we will broadcast to all
  socket.on("end", () => {
    const clientToRemove = clients.findIndex(
      (client) => client.socket === socket
    );
    if (clientToRemove !== -1) {
      clients.splice(clientToRemove, 1);
    }
    clients.map((client) => {
      client.socket.write(`User ${clientId} left`);
    });
  });
  clients.push({ id: clientId.toString(), socket });
});

server.listen(3008, "127.0.0.1", () => {
  console.log("server open on", server.address());
});
