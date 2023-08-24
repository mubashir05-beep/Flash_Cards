import { Request, Response } from "express";
import DeckModel from "../models/Deck";

export const createDeckCardController = async (req: Request, res: Response) => {
  const deckId = req.params.decksid;
  const deck = await DeckModel.findById(deckId);
  if (!deck) return res.status(400).send("no deck of this id exosts");
  const { text } = req.body;
  deck.cards.push(text);
  await deck.save();
  res.json(deck);
};