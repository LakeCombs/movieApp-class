import axios from "axios";

export const MovieApi = axios.create({
  baseURL: "https://www.omdbapi.com",
});
