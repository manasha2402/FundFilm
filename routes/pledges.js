import express from "express";

const pledges = [
    {
        name: "Margaret",
        email: "bertoni.m@northeastern.edu",
        pledge: "100",
        comment: "Let's do this"
    }
];
const router = express.Router();

router.get("/pledges", (req, res)=> {
    console.log("Received request for /api/pledges");
    res.json({
        pledges,
    });
})

export default router; 