
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import AuthRoute from "./routes/AuthRoutes.js"

dotenv.config();
const app = express();


app.use(cors());
app.use(express.json());

app.use('/api/auth', AuthRoute)


app.listen(process.env.PORT, () => {
    console.log(`Server started on ${process.env.PORT}`)
})