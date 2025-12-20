import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js";
import { connectDB } from "./db/db.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.use("/api/user", userRoute);

app.get("/", (req, res) => {
  res.send("Server is running........");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});