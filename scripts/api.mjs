import axios from "axios";
import { writeFileSync } from "node:fs";

export const fetchApi = async () => {
  const params = {
    type: "tv",
    filter: "bypopularity",
    rating: "pg",
    page: 1,
    limit: 30,
  };
  const url = "https://api.jikan.moe/v4/top/anime";
  try {
    const response = await axios.get(url, { params });
    const data = response.data;
    writeFileSync("scripts/api.json", JSON.stringify(data, null, 2), "utf-8");
    console.log("Data fetched and saved to api.json");
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

fetchApi();
