import React, { useState, useEffect } from "react";
import "./App.css";

interface FetchedData {
  _id: string;
  title: string;
  __v: number;
}

import { Link } from "react-router-dom";
import { createDeck } from "./api/createDeck";
import { fetchData } from "./api/fetchDeck";
import { deleteDecks } from "./api/deleteDeck";
function App() {
  const [title, setTitle] = useState("");
  const [data, setData] = useState<FetchedData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSending(true);
      await createDeck(title);
      await setTitle("");
      setIsSending(false);
      fetchDataAndUpdateState()
    } catch (error) {
      console.error("Error:", error);
      setIsSending(false);
    }
  };

  useEffect(() => {
    fetchDataAndUpdateState();
  },[] );

  const fetchDataAndUpdateState = async () => {
    try {
      setIsLoading(true);
      const fetchedData = await fetchData();
      await setData(fetchedData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  const deleteDeck = async (decksid: string) => {
    try {
      deleteDecks(decksid);
      setData((prevData) => prevData.filter((item) => item._id !== decksid));
    } catch (error) {
      console.error("Error deleting deck:", error);
    }
  };
  return (
    <div className="app-container">
      <h1 className="title">Deck Manager</h1>
      <div className="card-container">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          data.map((item) => (
            <div key={item._id} className="card">
              <h3>
                <Link to={`decks/${item._id}`}>{item.title}</Link>
              </h3>
              <div
                onClick={() => {
                  deleteDeck(item._id);
                }}
                className="button"
              >
                Delete
              </div>
            </div>
          ))
        )}
      </div>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          onChange={handleInputChange}
          value={title}
          className="input"
          placeholder="Enter title"
          required
        />
        <button type="submit" className="button" disabled={isSending}>
          {isSending ? "Creating..." : "Create Deck"}
        </button>
      </form>
    </div>
  );
}

export default App;
