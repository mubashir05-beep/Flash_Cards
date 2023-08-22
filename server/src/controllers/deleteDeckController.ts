import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core"; // Import ParamsDictionary type
import DeckModel from "../models/Deck";

export const deleteDeckController = async (req: Request<ParamsDictionary, any, any, any, { decksid: string }>, res: Response<any>) => {
    const deckId = req.params.decksid;
    const deck = await DeckModel.findByIdAndDelete(deckId);
    res.json(deck);
}
