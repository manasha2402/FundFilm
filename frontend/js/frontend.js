console.log("Hello from the frontend JS file");

function Pledges() {
    const me = {};

    const renderPledges = (pledges) => {
        const pledgesDiv = document.getElementById("pledges");
        for (const {name, pledge, comment} of pledges){
            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `<div>Name: ${name} Pledge: $${pledge} Comment: ${comment}</div>`;
            pledgesDiv.appendChild(card);
        }
    };
    me.refreshPledges = async () => {
        const res = await fetch("/api/pledges");
        if(!res.ok){
            console.error("Failed to fetch listings", res.status, res.statusText);
            return; 
        }
        const data = await res.json();
        console.log("Fetched pledges", data);

        const pledgesDiv = document.getElementById("pledges");
        pledgesDiv.innerHTML = "";

        renderPledges(data.pledges);

    };

    return me;
}

const myPledges = Pledges(); 
myPledges.refreshPledges();

/*
import { CommandSucceededEvent } from "mongodb";

function Pledges(){
    const me = {};

    const renderPledges = (pledges) => {
        const pledgesDiv = document.getElementById("pledges");
        for (const {name, pledge, comment} of pledges){
            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `<div> Name: ${name} Pledge: $${pledge} Comment: ${comment}</div>`;
            pledgesDiv.appendChild(card);
            
        }

    };

    me.refreshPledges = async () => {
        const res = await fetch("/api/pledges");
        // Check if there's an error
        if(!res.ok){
            console.error("Failed to fetch pledges", res.status, res.statusText);
            return; 
        }
        const data = await res.json();
        console.log("Fetched Pledges", data);
        const pledgesDiv = document.getElementById("pledges");
        pledgesDiv.innerHTML= "";

        renderPledges(data.pledges);


    };

    return me;
}
const myPledges = Pledges(); 
myPledges.refreshPledges();
*/