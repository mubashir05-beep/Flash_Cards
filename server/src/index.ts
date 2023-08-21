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

app.get("/", (req, res) => {
  res.json("hello");
});

app.delete("/decks/:decksid", deleteDeckController);

app.post("/decks", createDeckController);

app.get("/decks", fetchDeckController);

app.post("/decks/:decksid/cards", createDeckCardController);

app.get("/decks/:decksid", fetchDeckCardController);

app.delete("/decks/:decksid/cards/:index", deleteDeckCard);

app.get("/api/hello/", (req, res) => {
  res.json({
      message: "Hello World"
  });
});

mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log(`Listening on port ${process.env.PORT}`);
  if (process.env.PORT) {
    app.listen(process.env.PORT);
  }
});

