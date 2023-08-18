import { API_URL } from "./config";

export const createDeck = async (title:string) => {
    if (title !== "") {
      try {
        const response = await fetch(`${API_URL}/decks`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title,
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
    }
  };
  