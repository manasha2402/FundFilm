import express from 'express';
import updatesRouter from "./routes/updates.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("frontend"));

app.use("/api/", updatesRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);

});