const express = require("express");
const path = require("path");
// configuração dos protocolos http e websocket
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "public"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.use("/", (req, res) => {
  res.render("index.html");
});

let render = {};

io.on("connection", (socket) => {
  console.log(`Socket conectado: ${socket.id}`);
  socket.emit("init", socket.id);
  render[socket.id] = {
    x: 30,
    y: 20,
    fill: Math.floor((255 - 50) * Math.random()),
    fill2: Math.floor((255 - 50) * Math.random()),
  };
  socket.emit("prerender", render);

  socket.on("update", (data) => {
    render = data;
    socket.broadcast.emit("render", render);
  });
});

server.listen(3100);
