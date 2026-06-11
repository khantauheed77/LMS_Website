import express from "express";
import cors from "cors";
import connectDB from "./configs/mongodb.js";

import dotenv from "dotenv";
import { clerkWebhooks } from "./controllers/webhooks.js";
dotenv.config();


//initialzing express

const app = express();

//Connecting to MongoDB
connectDB();

//MiddleWare
app.use(cors());

//Routes
app.get("/", (req, res) => {
    res.send('API Working');
})
app.post('/clerk',express.json(),clerkWebhooks)

//Port

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})