import axios from "axios";

//base da url: https://api.themoviedb.org/3/
//URL: movie/popular?api_key=aa17e2b78a35ef77db2729c4af17c5c2&language=pt-BR

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});

export default api;