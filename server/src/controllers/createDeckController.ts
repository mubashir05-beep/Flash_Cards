import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core"; // Import ParamsDictionary type
import DeckModel from "../models/Deck";

export const createDeckController = async (req: Request<ParamsDictionary, any, any, { title: string }>, res: Response<any>) => {
    const newDeck = new DeckModel({
      title: req.body.title
    });
    const createdDeck = await newDeck.save();
    res.json(createdDeck);
}
