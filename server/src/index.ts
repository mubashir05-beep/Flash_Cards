import express, { Request, Response } from "express";
import mongoose from "mongoose";
import DeckModel from "./models/Deck";
import { config } from "dotenv";
config();
const app = express();
import cors from "cors"
const PORT = 9000;

app.use(express.json());
app.use(cors())

app.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});

app.post("/decks", async (req: Request, res: Response) => {
  console.log(req.body);
  const newDeck = new DeckModel({
    title: req.body.title
  });
  const createdDeck = await newDeck.save();
  res.json(createdDeck);
});

mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log(`Listening on port ${PORT}`);
  app.listen(PORT);
});
