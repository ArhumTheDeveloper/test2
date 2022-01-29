const express = require("express");
const path = require("path");
var app = express();
var server = app.listen(3000, function () {
    console.log("Listening on port 3000");
  });
  const fs = require("fs");
  const io = require("socket.io")(server, {
    allowEIO3: true, // false by default
  });
  app.use(express.static(path.join(__dirname, "")));


  app.use(express.static(path.join(__dirname, "")));
  var userConnections = [];
  io.on("connection", (socket) => {
    console.log("socket id is ", socket.id);
    socket.on("userconnect", (data) => {
      console.log("userconnent", data.displayName, data.meetingid);
      var other_users = userConnections.filter(
        (p) => p.meeting_id == data.meetingid
      );
      userConnections.push({
        connectionId: socket.id,
        user_id: data.displayName,
        meeting_id: data.meetingid,
      });
        other_users.forEach((v) => {
            socket.to(v.conncetionId).emit("imform_others_about_me", {
                other_users: data.displayName,
                connId: socket.id
            })
        });
        socket.on("SDPProcess", (data) => {
            socket.to(data.to_connid).emit("SDPProcess", {
                message: data.message,
                from_connid: socket.id,

            })
        });
    });
    socket.emit("infrom_me_about_other_user",);
}
)
