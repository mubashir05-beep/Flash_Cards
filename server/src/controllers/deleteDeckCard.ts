import { Request, Response } from "express";
import DeckModel from "../models/Deck";

export const deleteDeckCard= async(req: Request, res: Response)=>{
    const deckId = req.params.decksid;
    const index = req.params.index;
    const deck = await DeckModel.findById(deckId);
    if (!deck) return res.status(400).send("no deck of this id exosts");
    const { text } = req.body;
    deck.cards.splice(parseInt(index),1);
    await deck.save();
    res.json(deck);
  }