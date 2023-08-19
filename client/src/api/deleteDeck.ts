import { API_URL } from "./config";


export const deleteDecks=async(decksid: string)=>{
    try {
        const response = await fetch(`${API_URL}/decks/${decksid}`, {
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