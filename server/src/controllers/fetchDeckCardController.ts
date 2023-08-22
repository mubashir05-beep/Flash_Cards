import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core"; // Import ParamsDictionary type
import DeckModel from "../models/Deck";

export const fetchDeckCardController = async (req: Request<ParamsDictionary, any, any, any, { decksid: string }>, res: Response<any>) => {
    try {
        const { decksid } = req.params;
        console.log("deckid:", decksid); // Check the value of deckid
        
        const fetchedDeck = await DeckModel.findById(decksid);
        
        if (!fetchedDeck) {
            return res.status(404).json({ error: "Deck not found" });
        }
        
        res.json(fetchedDeck);
    } catch (error) {
        console.error("Error fetching deck:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
