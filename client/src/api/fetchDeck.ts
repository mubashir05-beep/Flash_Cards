interface FetchedData {
    _id: string;
    title: string;
    __v: number;
  }
  import { API_URL } from "./config";

  export const fetchData = async () => {
    try {
      const response = await fetch(`${API_URL}/decks`);
      const resData: FetchedData[] = await response.json();
      return resData; // Return the fetched data
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; // Rethrow the error if needed.
    }
  };
  