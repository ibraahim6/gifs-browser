import axios from "axios";
export const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  params: {
    api_key: process.env.VUE_APP_KEY,
  },
});
export const apiUpload = axios.create({
  baseURL: "https://upload.giphy.com/v1/",
  params: {
    api_key: process.env.VUE_APP_KEY,
  },
});
