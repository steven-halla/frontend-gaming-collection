import axios from "axios";

export const getAllGames = async () => {
  console.log("get all games function start");
  return axios.get(`http://127.0.0.1:8000/api/games/`);
}
