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
  createCanvas(400, 400);
}

function setPlayers(c) {
  background(220, 300, 30);
  for (let i in c) {
    ellipse(c[i].x, c[i].y, 5);
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
    position.y = position.y + 10;
  }
  if (key == "w") {
    position.y = position.y - 10;
  }
  if (key == "a") {
    position.x = position.x - 10;
  }
}
