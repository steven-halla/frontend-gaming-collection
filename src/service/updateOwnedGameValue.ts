import axios from "axios";

export const updateOwnedGameValue = async (userId: number,
                                           gameId: number,
                                           fixedValue: number) => {
  const requestBody = {
    fixed_value: fixedValue
  };
  const response = await axios.patch(`http://127.0.0.1:8000/api/games_owned/users/${userId}/games/${gameId}/`, requestBody);
  console.log(response);
}
