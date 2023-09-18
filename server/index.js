
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import AuthRoute from "./routes/AuthRoutes.js"
import MessageRoute from "./routes/MessageRoutes.js"

dotenv.config();
const app = express();


app.use(cors());
app.use(express.json());

app.use('/api/auth', AuthRoute)
app.use("/api/messages", MessageRoute);


app.listen(process.env.PORT, () => {
    console.log(`Server started on ${process.env.PORT}`)
})

global.onlineUsers = new Map();
