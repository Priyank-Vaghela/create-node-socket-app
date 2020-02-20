var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
redisAdapter = require("socket.io-redis");

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

io.adapter(redisAdapter({ host: "3.83.47.185", port: 6379 }));
io.on("connection", function(socket) {
  console.log("user connected: " + socket.id);
  io.emit("hi", "connect user id:" + socket.id);

  socket.on("disconnect", function() {
    console.log("Got disconnect: " + socket.id);
  });
  socket.on("chat message", function(msg, fn) {
    console.log("message: " + msg);
    fn(msg + " received  ");
  });
});

http.listen(3001, function() {
  console.log("listening on *:3001");
});
