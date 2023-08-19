import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { createCard } from "./api/createCard";

import "./App.css";
import { getData } from "./api/getDeck";
import { deleteCard } from "./api/deleteCard";

interface FetchedData {
  _id: string;
  title: string;
  cards: string[];
  __v: number;
}

function Deck() {
  const [text, setText] = useState("");
  const [decks, setDecks] = useState<FetchedData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const { decksid } = useParams();
  const [cards, setCards] = useState<string[]>([]);

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSending(true);

      await createCard(decksid!, text);
      // Fetch deck cards after creating a new card
      fetchDeckCards();

      setText("");
      setIsSending(false);
    } catch (error) {
      console.error("Error:", error);
      setIsSending(false);
    }
  };

  const fetchDeckCards = async () => {
    const data = await getData(decksid!);
    setDecks([data]);
    setCards(data.cards); // Set the cards state to the fetched cards array
  };

  const handleDeleteCard = async (index: number) => {
    if (!decksid) return;
    const newDeck = await deleteCard(decksid, index);
    setCards(newDeck.cards);
  };

  useEffect(() => {
    fetchDeckCards();
  }, [decksid]);

  return (
    <div className="container">
      <h1 className="title">Card Manager</h1>
      <div className="card-container">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          decks.map((deck) => (
            <div key={deck._id} className="card">
              <h3>{deck?.title}</h3>
              <div className="card-list">
                {cards.map((cardTitle, index) => (
                  <div key={index} className="card">
                    {cardTitle}
                    <button
                      onClick={() => {
                        handleDeleteCard(index);
                      }}
                      className="button"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          onChange={handleInputChange}
          value={text}
          className="input"
          placeholder="Enter title"
          required
        />
        <button type="submit" className="button" disabled={isSending}>
          {isSending ? "Creating..." : "Create Card"}
        </button>
      </form>
    </div>
  );
}

export default Deck;
