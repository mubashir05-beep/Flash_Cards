import express from "express";
import mongoose from "mongoose";
import { createDeckController } from "./src/controllers/createDeckController";
import { deleteDeckController } from "./src/controllers/deleteDeckController";
import { fetchDeckController } from "./src/controllers/fetchDeckController";
import { createDeckCardController } from "./src/controllers/createDeckCardController";
import { fetchDeckCardController } from "./src/controllers/fetchDeckCardController";
import { deleteDeckCard } from "./src/controllers/deleteDeckCard";
import { config } from "dotenv";
import cors from "cors";

const PORT = 4000;
config();

const app = express();

app.use(express.json());

app.use(cors());

app.delete("/decks/:decksid", deleteDeckController);

app.post("/decks", createDeckController);

app.get("/decks", fetchDeckController);

app.post("/decks/:decksid/cards", createDeckCardController);

app.get("/decks/:decksid", fetchDeckCardController);

app.delete("/decks/:decksid/cards/:index", deleteDeckCard);

app.get("/api/hello/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URL!).then(() => {
  console.log(`Listening on port ${process.env.NEXT_PUBLIC_PORT}`);
  if (process.env.NEXT_PUBLIC_PORT) {
    app.listen(process.env.NEXT_PUBLIC_PORT);
  }
});

app.get("/", (req, res) => {
  res.send("Hey this is my API running 🥳");
});

// Export the Express API
module.exports = app;
