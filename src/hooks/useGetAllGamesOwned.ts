import {useContext, useEffect} from "react";
import {getAllGames} from "../service/getAllGames";
import {AppContext} from "../context/AppContext";
import {GamesOwned} from "../model/GamesOwned";

// see useGetAllGames hook's comments for explanation.
export const useGetAllGamesOwned = (): GamesOwned[] => {

  const {user, gamesOwned, getAllGamesOwned} = useContext(AppContext);

  // get all games owned each time the "user" state variable changes and is not null.
  useEffect(() => {
    if (user) {
      getAllGamesOwned(user.id);
    }
  }, [user]);

  return gamesOwned;
}
