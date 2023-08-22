import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core"; // Import ParamsDictionary type
import DeckModel from "../models/Deck";

export const createDeckCardController = async (req: Request<ParamsDictionary, any, { text: string }>, res: Response<any>) => {
    const deckId = req.params.decksid;
    const deck = await DeckModel.findById(deckId);
    if (!deck) return res.status(400).send("no deck of this id exists");
    
    const { text } = req.body;
    deck.cards.push(text);
    await deck.save();
    
    res.json(deck);
};
