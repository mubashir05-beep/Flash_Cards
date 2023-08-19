import { API_URL } from "./config";

export const createCard = async (deckid:string, text: string) => {

      try {
        const response = await fetch(`${API_URL}/decks/${deckid}/cards`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
           text
          }),
        });
  
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
  
        const responseData = await response.json();
        return responseData;
      } catch (error) {
        console.error("Error creating deck:", error);
        throw error;
      }
    
  };
  