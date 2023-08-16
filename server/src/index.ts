import express, { Request, Response } from "express";
import mongoose from "mongoose";
import DeckModel from "./models/Deck";

const app = express();

const PORT = 9000;

app.use(express.json());

app.get("/hello",  (req: Request, res: Response) => {
  res.send("hello world");
});

app.post('/decks', async  (req: Request, res: Response) => {
  console.log(req.body)
    const newDeck = new DeckModel({
        title: req.body.title,
    });
    const createdDeck = await newDeck.save();
    res.json(createdDeck);
});

mongoose
  .connect(
    "mongodb+srv://flashcard:mubmud@cluster0.gvjjzlx.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log(`Listening on port ${PORT}`);
    app.listen(PORT);
  });
