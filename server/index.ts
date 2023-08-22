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

const PORT = 4000
config();

const app = express();

app.use(express.json());

// app.use(cors());

app.get("/", (req, res) => {
  res.json("hello");
});

// app.delete("/decks/:decksid", deleteDeckController);

// app.post("/decks", createDeckController);

// app.get("/decks", fetchDeckController);

// app.post("/decks/:decksid/cards", createDeckCardController);

// app.get("/decks/:decksid", fetchDeckCardController);

// app.delete("/decks/:decksid/cards/:index", deleteDeckCard);

app.get("/api/hello/", (req, res) => {
  res.json({
      message: "Hello World"
  });
});

// const mongoUrl = process.env.NEXT_PUBLIC_MONGO_URL!;
const port = process.env.NEXT_PUBLIC_PORT || 4000;

// mongoose.connect(mongoUrl).then(() => {
//   console.log(`Connected to MongoDB`);
// });

app.get("/", (req, res) => {
  res.send("Hey this is my API running 🥳");
});

// Export the Express API
module.exports = app;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
// Export the Express API
module.exports = app