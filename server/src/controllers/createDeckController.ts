import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import DeckModel from "../models/Deck";

export const createDeckController = async (req: Request<any, any, { title: string }>, res: Response<any>) => {
    try {
        const newDeck = new DeckModel({
            title: req.body.title
        });
        const createdDeck = await newDeck.save();
        res.json(createdDeck);
    } catch (error) {
        console.error("Error creating deck:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
