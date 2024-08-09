import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import adminRoutes from "./routes/adminroutes.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

//routes

app.use("/api/admin",adminRoutes);


app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});