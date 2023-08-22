import { Request, Response } from "express";

import DeckModel from "../models/Deck"; // Import your DeckModel

export const createDeckController = async (req: Request<any, any, { title: string }>, res: Response<any>) => {
    try {
        const newDeck = new DeckModel({
            title: req.body.title
        });
       const createdDeck = await newDeck.save();
        
       return createdDeck
    } catch (error) {
        console.error("Error creating deck:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Import and integrate the loginUser function as needed
