import { MongoClient } from "mongodb";
function MyMongoDB(){
    const me = {};
    const URI = process.env.MONGODB_URI || "mongodb://localhost:27017";
    const DB_NAME = "pledgeDatabase";
    const COLLECTION_NAME = "pledges";

    const connect = () => {
        // Connect with client
        const client = new MongoClient(URI);
        const pledges = client.db(DB_NAME).collection(COLLECTION_NAME);
        console.log("Connected with Mongo");
        return {client , pledges}; 
    };

    me.getPledges = async (query = {}) => {
        // Connect to DB
        const { client, pledges } = connect(); 
        try{
            const data = await pledges.find(query).toArray();
            //console.log("Fetched pledges from mongodb", data);
            return data; 
        } catch (err){
            throw err;
        } finally {
            await client.close(); // Close client after get info
        }
       
    }
    return me; 
}

const myMongoDB = MyMongoDB();
export default myMongoDB; 