import React, { useState, useEffect } from "react";
import "./App.css";

interface FetchedData {
  _id: string;
  title: string;
  __v: number;
}

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
      const response = await fetch("http://localhost:9000/decks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
        }),
      });

      setTitle("");
      setIsSending(false);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Fetch data again to update the list with the newly created deck
      fetchData();
    } catch (error) {
      console.error("Error:", error);
      setIsSending(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:9000/decks");
      const resData: FetchedData[] = await response.json();
      setData(resData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {data.map((item) => (
            <li key={item._id}>{item.title}</li>
          ))}
        </ul>
      )}
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          onChange={handleInputChange}
          value={title}
          className="input"
          placeholder="Enter title"
        />
        <button type="submit" className="button" disabled={isSending}>
          {isSending ? "Creating..." : "Create Deck"}
        </button>
      </form>
    </div>
  );
}

export default App;
