import express from "express";
import { config } from "dotenv";
import cors from "cors";
import { connectToDatabase, db } from "./src/DB"; // Import the db and connectToDatabase

import { createDeckController } from "./src/controllers/createDeckController";
import { deleteDeckController } from "./src/controllers/deleteDeckController";
import { fetchDeckController } from "./src/controllers/fetchDeckController";
import { createDeckCardController } from "./src/controllers/createDeckCardController";
import { fetchDeckCardController } from "./src/controllers/fetchDeckCardController";
import { deleteDeckCard } from "./src/controllers/deleteDeckCard";

config();

const app = express();

app.use(express.json());

const corsOptions = {
  origin: "*", // Update with your allowed origins
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true
};
app.use(cors(corsOptions));



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

const port = process.env.NEXT_PUBLIC_PORT || 4000;

(async () => {
  await connectToDatabase(); // Connect to MongoDB

  app.get("/", (req, res) => {
    res.send("Hey this is my API running 🥳");
  });

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
})();
