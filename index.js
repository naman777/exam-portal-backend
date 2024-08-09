import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import testRoutes from "./routes/testRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

//routes
app.use("/api/admin",testRoutes);


app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});