import { MongoClient, ObjectId } from "mongodb";

export default function myMongoDB() {
  const DB_NAME = "projectUpdates";
  const COLLECTION_NAME = "updates";
  const DEFAULT_URI = "mongodb://localhost:27017";

  const me = {};
  const URI = process.env.MONGODB_URI || DEFAULT_URI;

  const connect = () => {
    const client = new MongoClient(URI);
    const updates = client.db(DB_NAME).collection(COLLECTION_NAME);
    return { client, updates };
  };

  me.getUpdates = async (query = {}) => {
    const { client, updates } = connect();

    try {
      const data = await updates.find(query).toArray();
      console.log("Fetched updates from MongoDB:", data);
      return data;
    } catch (err) {
      console.error("Error fetching updates:", err);
      throw err;
    } finally {
      await client.close();
    }
  };

  me.addUpdate = async (update) => {
    const { client, updates } = connect();
    try {
      await client.connect();
      const doc = await updates.insertOne(update);
      createdAt: (new Date(), console.log("Inserted update:", doc));
      return doc;
    } catch (err) {
      console.error("Error inserting update:", err);
      throw err;
    } finally {
      await client.close();
    }
  };

  me.deleteUpdate = async (updateId) => {
    const { client, updates } = connect();
    try {
      await client.connect();
      const update =  await updates.findOne({ _id: new ObjectId(updateId) });
      const result = await updates.deleteOne({ _id: new ObjectId(updateId) });
      console.log("Deleted update:", result);
      return { result, update  };
    } catch (err) {
      console.error("Error deleting update:", err);
      throw err;
    } finally {
      await client.close();
    }
  };

  return me;
}
