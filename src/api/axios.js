import axios from "axios";

const baseApiUrl = "http://10.50.66.246:3003/api";

console.log(baseApiUrl);

const apiInstance = axios.create({
  baseURL: baseApiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiInstance;
