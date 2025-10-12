import { MongoClient } from "mongodb";
function MyMongoDB() {
  const me = {};
  const URI = process.env.MONGODB_URI || "mongodb://localhost:27017";
  const DB_NAME = "pledgeDatabase";
  const COLLECTION_NAME = "pledges";

  const connect = () => {
    // Connect with client
    const client = new MongoClient(URI);
    const pledges = client.db(DB_NAME).collection(COLLECTION_NAME);
    console.log("Connected with Mongo");
    return { client, pledges };
  };

  // Get Pledges to Load
  me.getPledges = async (query = {}) => {
    // Connect to DB
    const { client, pledges } = connect();
    try {
      const data = await pledges.find(query).toArray();
      //console.log("Fetched pledges from mongodb", data);
      return data;
    } finally {
      await client.close(); // Close client after get info
    }
  };

  // Get summary amount of pledges
  me.sumPledges = async () => {
    // connect to db
    const { client, pledges } = connect();
    try {
      //const totalPledges = await pledges.countDocuments(query);
      const sumPledges = await pledges
        .aggregate([
          {
            $group: {
              _id: null,
              total: { $sum: "$pledge" },
            },
          },
        ])
        .toArray();

      return sumPledges[0].total;
    } catch (error) {
      console.error("There was an error in summarizing", error);
    } finally {
      await client.close();
    }
  };

  me.totalPledges = async (query = {}) => {
    const { client, pledges } = connect();
    try {
      const totalPledges = await pledges.countDocuments(query);
      return totalPledges;
    } catch (error) {
      console.error("There was an error in summarizing", error);
    } finally {
      await client.close();
    }
  };

  // Add New Pledge
  me.addPledge = async (newName, newEmail, newPledge, newComment) => {
    const newDoc = {
      name: newName,
      email: newEmail,
      pledge: newPledge,
      comment: newComment,
    };
    const { client, pledges } = connect();
    try {
      const result = await pledges.insertOne(newDoc);
      return result;
    } catch (error) {
      console.error("Error adding new pledge", error);
    } finally {
      await client.close();
    }
  };

  return me;
}

const myMongoDB = MyMongoDB();
export default myMongoDB;
