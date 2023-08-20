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

app.use(
  cors({
    origin: [
      "https://flash-cards-app-tau.vercel.app/",
      "https://flash-cards-api-eight.vercel.app/",
    ], // This should be a string or an array of allowed origins
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Specify the allowed HTTP methods
    credentials: true, // Allow credentials (cookies, HTTP authentication)
  })
);

app.get("/", (req, res) => {
  res.json("hello");
});

app.delete("/decks/:decksid", deleteDeckController);

app.post("/decks", createDeckController);

app.get("/decks", fetchDeckController);

app.post("/decks/:decksid/cards", createDeckCardController);

app.get("/decks/:decksid", fetchDeckCardController);

app.delete("/decks/:decksid/cards/:index", deleteDeckCard);

mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log(`Listening on port ${process.env.PORT}`);
  if (process.env.PORT) {
    app.listen(process.env.PORT);
  }
});

if (process.env.NODE_ENV === "production") {
  const path = require("path");
  app.use(express.static(path.resolve(__dirname, 'client', 'build')));
  app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'),function (err) {
          if(err) {
              res.status(500).send(err)
          }
      });
  })
}