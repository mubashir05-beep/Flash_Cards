import { Request, Response } from "express";
import DeckModel from "../models/Deck";

export const fetchDeckController=async (req: Request, res: Response) => {
    const fetchedDeck=await DeckModel.find();
    res.json(fetchedDeck)
}