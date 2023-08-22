import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core"; // Import ParamsDictionary type
import DeckModel from "../models/Deck";

export const deleteDeckCard = async (req: Request<ParamsDictionary, any, any, any, { decksid: string, index: string }>, res: Response<any>) => {
    const deckId = req.params.decksid;
    const index = req.params.index;
    const deck = await DeckModel.findById(deckId);
    
    if (!deck) {
        return res.status(400).send("No deck of this id exists");
    }
    
    deck.cards.splice(parseInt(index), 1);
    await deck.save();
    
    res.json(deck);
};
