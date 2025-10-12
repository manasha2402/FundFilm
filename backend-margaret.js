import express from "express";
import pledgesRouter from "/FundFilm/routes/pledges.js";
import submitRouter from "/FundFilm/routes/submitPledges.js";
import sumRouter from "/FundFilm/routes/sum.js";
import adminRouter from "/FundFilm/routes/admin.js";
import deleteRouter from "/FundFilm/routes/deletePledge.js";
import updateRouter from "/FundFilm/routes/updatePledge.js";

console.log("Initializing the backend...");
// Initialize express
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("frontend"));
app.use("/api/", pledgesRouter);

app.use("/api/", submitRouter);
app.use("/api/", sumRouter);
app.use("/api/", adminRouter);
app.use("/api/", deleteRouter);
app.use("/api/", updateRouter);

// CALL GET TO >>>

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
