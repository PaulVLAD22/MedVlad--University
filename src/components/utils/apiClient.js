import axios from "axios";

export const baseUrl = "https://localhost:8080/";

export const apiClient = axios.create({
  baseURL: baseUrl,
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
});
