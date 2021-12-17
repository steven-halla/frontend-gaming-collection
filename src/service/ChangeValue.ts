import axios from "axios";

export interface changeValueRequest {
  gameid: number;
  userid: number;
}

export const changeValue = async  (request: changeValueRequest) => {
  console.log(request);
  const response = await axios.patch(`http://127.0.0.1:8000/api/games_owned/users/3/games/5/`);
  console.log(response);
}
