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


app.delete("/decks/:deckid",async(req: Request, res: Response)=>{

  const deckId=req.params.deckid;
  const deck= await DeckModel.findByIdAndDelete(deckId);
  res.json(deck);
})

app.post("/decks", async (req: Request, res: Response) => {
  const newDeck = new DeckModel({
    title: req.body.title
  });
  const createdDeck = await newDeck.save();
  res.json(createdDeck);
});

app.get("/decks", async (req: Request, res: Response) => {
    const fetchedDeck=await DeckModel.find();
    res.json(fetchedDeck)
})
mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log(`Listening on port ${PORT}`);
  app.listen(PORT);
});
