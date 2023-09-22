
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import AuthRoute from "./routes/AuthRoutes.js"
import MessageRoute from "./routes/MessageRoutes.js"
import { Server } from 'socket.io'
import morgan from 'morgan'

dotenv.config();
const app = express();


app.use(cors());
app.use(express.json());
app.use(morgan('tiny'))
app.use("/uploads/images",express.static("uploads/images"))

app.use('/api/auth', AuthRoute)
app.use("/api/messages", MessageRoute);


const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on ${process.env.PORT}`)
})

//initializes a new socket.io server and binds it to an existing HTTP server (server) instance
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000'
    }
})

global.onlineUsers = new Map();
//sets up an event handler for when a new client connects to the WebSocket server.
io.on('connection', (socket) => {
    global.chatSocket = socket;
    socket.on('add-user', (userId) => {
        onlineUsers.set(userId, socket.id)
    })
    socket.on("send-msg", (data) => {
      //get the reciever of the message
      const sendUserSocket = onlineUsers.get(data.to);
      if (sendUserSocket) {
        socket.to(sendUserSocket).emit("msg-recieve", {
          from: data.from,
          message: data.message,
        });
      }
    });
})

//uploads/images/1695244537797Bashir.JPG
