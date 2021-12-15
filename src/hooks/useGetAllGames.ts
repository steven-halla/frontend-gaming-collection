import {useContext, useEffect} from "react";
import {getAllGames} from "../service/getAllGames";
import {AppContext} from "../context/AppContext";

// custom hook which calls "getAllGames", which in turn calls api and fetches all games data.
// it then stores the returned games data, of type Game[], into the "games" state variable via "setGames".
// it then conveniently returns the "games" state variable so that the consumer
// doesn't have to also import the "games" state variable via useContext.
export const useGetAllGames = () => {

  const {games, setGames} = useContext(AppContext);

  useEffect(() => {
    getAllGames()
      .then(response => {
        setGames(response.data);
      });
  }, []);

  return games;
}
