let position = {
  x: 20,
  y: 20,
};

let players = {};

var socket = io("http://localhost:3100");
var game_id;

socket.on("init", function (id) {
  game_id = id;
  socket.on("prerender", function (data) {
    players = data;
  });
});

socket.on("render", function (data) {
  players = data;
});

function setup() {
  createCanvas(800, 500);
  background("#212437");
}

function setPlayers(c) {
  for (let i in c) {
    fill(c[i].fill, c[i].fill2, 200);
    ellipse(c[i].x, c[i].y, 10);
  }
}

function draw() {
  noStroke();
  setPlayers(players);
}

function keyPressed() {
  if (key == "d") {
    players[game_id].x = players[game_id].x + 10;
    socket.emit("update", players);
  }
  if (key == "s") {
    players[game_id].y = players[game_id].y + 10;
    socket.emit("update", players);
  }
  if (key == "w") {
    players[game_id].y = players[game_id].y - 10;
    socket.emit("update", players);
  }
  if (key == "a") {
    players[game_id].x = players[game_id].x - 10;
    socket.emit("update", players);
  }
}
