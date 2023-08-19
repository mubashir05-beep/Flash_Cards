interface FetchedData {
  _id: string;
  title: string;
  cards: string[];
  __v: number;
}

import { API_URL } from "./config";

export const getData = async (decksid: string) => {
  try {
    const response = await fetch(`${API_URL}/decks/${decksid}`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const resData: FetchedData = await response.json();
    return resData; // Return the fetched data
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Rethrow the error if needed.
  }
};
