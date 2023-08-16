import express, { Request, Response } from "express";
import mongoose from "mongoose";
import DeckModel from "./models/Deck";

const app = express();

const PORT = 5000;

app.get("/hello",  (req: Request, res: Response) => {
  res.send("hello world");
});

app.post('/decks',async (res:Response,req:Request)=>{
    const newDeck=new DeckModel({
        title:"Hello first Post!",
    });
    const createdDeck = await newDeck.save();
    res.json(createdDeck);
})




mongoose
  .connect(
    "mongodb+srv://flashcard:mubmud@cluster0.gvjjzlx.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log(`Listening on port ${PORT}`);
    app.listen(PORT);
  });

//   async function startServer() {
//     try {
//       await mongoose.connect(  "mongodb+srv://flashcard:mubmud@cluster0.gvjjzlx.mongodb.net/?retryWrites=true&w=majority");

//       console.log(`Connected to MongoDB`);
//       app.listen(PORT, () => {
//         console.log(`Listening on port ${PORT}`);
//       });
//     } catch (error) {
//       console.error("Error connecting to MongoDB:", error);
//     }
//   }

//   // Call the async function to start the server
//   startServer();
