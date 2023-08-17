import React, { useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState('');

  const handleInputChange = (e) => {
    setData(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:9000/decks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: data, // Assuming your server expects a 'title' field
        }),
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      // Handle the form submission if needed
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type='text' onChange={handleInputChange} value={data} />
        <input type='submit' />
      </form>
      <div>{data}</div>
    </>
  );
}

export default App;
