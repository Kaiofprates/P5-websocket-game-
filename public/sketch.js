let position = {
  x: 20,
  y: 20,
};

let players = {};

var socket = io("http://localhost:3100");
var game_id;

let angle = 0;
let slides;

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
  angleMode(DEGREES);
  slides = createSlider(0.1, 10, 0.1, 0.1);
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
  // rect(10, 250, 500, 6);
  // rect(610, 250, 200, 6);

  strokeWeight(2);
  let x = 140 * cos(angle);
  let y = 140 * sin(angle);
  translate(560, 250);
  stroke(x * 30, y * 3, 123);
  line(x, y, 0, 0);
  line(-x, -y, 0, 0);

  fill("#6DECB1");
  ellipse(x, y, 14);
  ellipse(-x, -y, 14);

  angle += slides.value();
  textSize(30);
  slides.position(400, 430);
  text(slides.value(), 100, 740);
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
