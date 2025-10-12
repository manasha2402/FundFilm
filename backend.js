import express from 'express';
import pledgesRouter from "./routes/pledges.js";
import submitRouter from "./routes/submit.js";

console.log("Initializing the backend...");
// Initialize express
const app = express();
const PORT = process.env.PORT || 3000; 

app.use(express.static('frontend'));
app.use("/api/", pledgesRouter);

app.use("/api/", submitRouter);

// CALL GET TO >>>

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}); 

