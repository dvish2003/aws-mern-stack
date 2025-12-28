import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js";
import { connectDB } from "./db/db.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(cors({
  origin: [
    "http://13.51.48.151:3000",
    "http://localhost:3000"
  ],
  credentials: true
}));

app.use("/api/user", userRoute);

app.get("/", (req, res) => {
  res.send("Server is running........");
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});