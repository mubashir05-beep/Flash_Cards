import { MongoClient, MongoClientOptions } from 'mongodb';
import { config } from "dotenv";

config();

const URI = process.env.NEXT_PUBLIC_MONGODB_URI!;
const DB_NAME = 'myFirstDatabase'; // Replace with your actual database name

const client = new MongoClient(
  URI, 
);

console.log(`⚡️[App running]: Connecting to the database...`);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log(`⚡️[DB]: Connected to the database!`);
  } catch (error) {
    console.log(`⚡️[DB]: Could not connect to the database.`);
    console.error(error);
  }
}

const db = client.db(DB_NAME);

export { db, connectToDatabase };
