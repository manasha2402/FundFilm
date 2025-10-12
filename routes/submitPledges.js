import express from "express";
import MyDB from "../db/MyMongoDB.js";

const router = express.Router();

router.use(express.urlencoded({extended: true}));
// NEED TO IMPLEMENT THIS
router.post("/pledges", (req, res)=> {
    console.log("Received post request for /api/pledges");
    
    // Extract data from request body (because its a POST request)
    const {name, email, pledge, comment} = req.body; 


    // Log to Console
    console.log("Received This Name: ", name);
    // Send to Data Base
    MyDB.addPledge(req.body.name, req.body.email, req.body.pledge, req.body.comment);
    console.log("Added new pledge");
    res.redirect("/");
    /*
    try{
        const succeed = MyDB.addPledge(name, email, pledge, comment); 
    }  catch (err) {
        console.log("Error adding entry");
        throw err; 
    }
        */
    // Send success response (?)
    
});
export default router; 