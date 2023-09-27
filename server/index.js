import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import AuthRoute from "./routes/AuthRoutes.js";
import MessageRoute from "./routes/MessageRoutes.js";
import { Server } from "socket.io";
import morgan from "morgan";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

app.use("/uploads/recordings", express.static("uploads/recordings"));
app.use("/uploads/images", express.static("uploads/images"));

app.use("/api/auth", AuthRoute);
app.use("/api/messages", MessageRoute);

const server = app.listen(process.env.PORT, () => {
  console.log(`Server started on ${process.env.PORT}`);
});

//initializes a new socket.io server and binds it to an existing HTTP server (server) instance
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

//global data structure where the onlineUsers in avaliable globally
//sets up an event listener for when a client (a user's web browser) establishes a connection to the server using Socket.IO
//socket represents the WebSocket connection established between the server and the client. It allows bidirectional communication between the server and the specific client that just connected.
global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id); //map user to it socket id
    socket.broadcast.emit("online-users", {
      onlineUsers: Array.from(onlineUsers.keys()),
    });
  });
  socket.on("sign-out", (id) => {
    onlineUsers.delete(id);
    socket.broadcast.emit("online-users", {
      onlineUsers: Array.from(onlineUsers.keys()),
    });
  })
  socket.on("send-msg", (data) => {
    //get the reciever of the message
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      console.log(sendUserSocket);
      socket.to(sendUserSocket).emit("msg-recieve", {
        from: data.from,
        message: data.message,
      });
    }
  });
  socket.on("outgoing-voice-call", (data) => {
    const sendUserSocket = onlineUsers.get(data.to); //return socket id of the reciepent

    // send the "incoming-voice-call" event specifically to the client associated with that socket ID
    console.log(data.from);
    socket.to(sendUserSocket).emit("incoming-voice-call", {
      from: { ...data.from },
      roomId: data.roomId,
      callType: data.callType,
    });
  });

  socket.on("outgoing-video-call", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    // send the "incoming-video-call" event specifically to the client associated with that socket ID
    socket.to(sendUserSocket).emit("incoming-video-call", {
      from: data.from,
      roomId: data.roomId,
      callType: data.callType,
    });
  });

  socket.on("reject-voice-call", (data) => {
    const sendUserSocket = onlineUsers.get(data.from);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("voice-call-rejected");
    }
  });

  socket.on("reject-video-call", (data) => {
    const sendUserSocket = onlineUsers.get(data.from);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("video-call-rejected");
    }
  });

  socket.on("accept-incoming-call", ({ id }) => {
    const sendUserSocket = onlineUsers.get(id);
    socket.to(sendUserSocket).emit("accept-call");
  });
});
