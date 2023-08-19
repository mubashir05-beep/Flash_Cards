import express from "express";
import mongoose from "mongoose";
import { createDeckController } from "./controllers/createDeckController";
import { deleteDeckController } from "./controllers/deleteDeckController";
import { fetchDeckController } from "./controllers/fetchDeckController";
import { createDeckCardController } from "./controllers/createDeckCardController";
import { fetchDeckCardController } from "./controllers/fetchDeckCardController";
import { deleteDeckCard } from "./controllers/deleteDeckCard";
import { config } from "dotenv";
import cors from "cors";



config();

const app = express();

app.use(express.json());

app.use(cors());

const PORT = 9000;

app.delete("/decks/:decksid", deleteDeckController);

app.post("/decks", createDeckController);

app.get("/decks", fetchDeckController);

app.post("/decks/:decksid/cards", createDeckCardController);

app.get("/decks/:decksid",fetchDeckCardController)

app.delete("/decks/:decksid/cards/:index",deleteDeckCard)

mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log(`Listening on port ${PORT}`);
  app.listen(PORT);
});
