import axios from "axios";

const blogApi = axios.create({
  baseURL: "/api",
});

export default blogApi;
