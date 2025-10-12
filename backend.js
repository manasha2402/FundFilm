import express from "express";
import updatesRouter from "./routes/updates.js";
import { connectDB } from "./db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

await connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("frontend"));

app.use("/api/", updatesRouter);
app.use("/uploads", express.static("uploads"));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});