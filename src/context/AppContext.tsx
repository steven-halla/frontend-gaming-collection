import React, {FC, useState} from 'react';
import {Game} from "../model/Game";
import {User} from "../model/User";
import {GamesOwned} from "../model/GamesOwned";
import axios from "axios";


interface AppContextState {
  user?: User;
  setUser: (user?: User) => void;

  users: User[];
  setUsers: (users: User[]) => void;

  game?: Game;
  setGame: (game?: Game) => void;

  games: Game[];
  setGames: (games: Game[]) => void;

  gameOwned?: GamesOwned;
  setGameOwned: (gameOwned?: GamesOwned) => void;

  gamesOwned: GamesOwned[];
  setGamesOwned: (gamesOwned: GamesOwned[]) => void;
  getAllGamesOwned: (userId: number) => void;
  addGameToCollection: (userId: number, gameId: number) => void;
  deleteGameFromCollection: (userId: number, gameId: number) => void;
}


export const AppContext = React.createContext({} as AppContextState);

export const AppContextProvider: FC = (props) => {
  const [game, setGame] = useState<Game>();
  const [games, setGames] = useState<Game[]>([]);
  const [user, setUser] = useState<User>();
  const [users, setUsers] = useState<User[]>([]);
  const [gameOwned, setGameOwned] = useState<GamesOwned>();
  const [gamesOwned, setGamesOwned] = useState<GamesOwned[]>([]);

  const getAllGamesOwned = async (userId: number) => {
    console.log("get all games owned function start, user: " + userId);
    let response = await axios.get(`http://127.0.0.1:8000/api/games_owned/users/${userId}/`)
    setGamesOwned(response.data);
  }

  const addGameToCollection = async (userId: number, gameId: number) => {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/games_owned/users/${userId}/games/${gameId}/`);
      console.log("adding game to your collection");
      getAllGamesOwned(userId);

    } catch (ex) {
      console.log('error in add call', ex);
    }
  }

  const deleteGameFromCollection = async (userId: number, gameId: number) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/games_owned/users/${userId}/games/${gameId}/`);
      console.log("i just did an axios call for delete")
      setGamesOwned(
        gamesOwned.filter(gameOwned => gameOwned.game.id !== gameId)
      );
    } catch (ex) {
      console.log('Error in Delete Call', ex);
    }
  }

  return (
    <AppContext.Provider
      value={{
        game, setGame,
        games, setGames,
        user, setUser,
        users, setUsers,
        gameOwned, setGameOwned,
        gamesOwned, setGamesOwned, getAllGamesOwned, addGameToCollection, deleteGameFromCollection
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
