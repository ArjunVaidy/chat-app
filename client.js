const net = require("net");
// to handle input and output streams for reading input from users (via the command line) and writing output
const readline = require("readline/promises");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let id;

const socket = net.createConnection(
  {
    host: "127.0.0.1",
    port: 3008,
  },
  () => {
    console.log("connected to the server");
    const ask = async () => {
      const message = await rl.question("Enter a message >");
      process.stdout.moveCursor(0, -1); // dx,dy --> how much direction to move in x and y direction for the cursor in the console
      process.stdout.clearLine(0); // 0,1,-1 --> o clears the whole line
      socket.write(`${id}-message-${message}`);
    };
    ask();

    socket.on("data", (data) => {
      console.log(); // createa new empty line and then move up to prevent deleting previous display text line
      process.stdout.moveCursor(0, -1); // dx,dy --> how much direction to move in x and y direction for the cursor in the console
      process.stdout.clearLine(0); // 0,1,-1 --> o clears the whole line
      // extracting only id from server - id-1 using string methods
      if (data.toString().substring(0, 2) == "id") {
        id = data.toString().substring(3);
        console.log(`Your id is ${id}! \n`);
      } else {
        console.log(data.toString("utf8"));
      }
      ask();
    });
  }
);

socket.on("end", () => {
  console.log("connection was ended");
});
