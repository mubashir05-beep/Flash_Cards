import { API_URL } from "./config";

API_URL
export const deleteDecks=async(deckID: string)=>{
    try {
        const response = await fetch(`${API_URL}/decks/${deckID}`, {
          method: "DELETE",
        });
            return response
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
       
      } catch (error) {
        console.error("Error deleting deck:", error);
      }
}