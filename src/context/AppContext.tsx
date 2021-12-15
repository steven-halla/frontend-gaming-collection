import React, {FC, useState} from 'react';
import {Game} from "../model/Game";
import {User} from "../model/User";
import {GamesOwned} from "../model/GamesOwned";


interface AppContextState {
  user?: User;
  setUser: (user?: User) => void;

  users: User[];
  setUsers:(users: User[]) => void;


  game?: Game;
  setGame: (game?: Game) => void;

  games: Game[];
  setGames:(games: Game[]) => void;


  gameOwned?: GamesOwned;
  setGameOwned: (gameOwned?: GamesOwned) => void;

  gamesOwned?: GamesOwned[];
  setGamesOwned: (gamesOwned: GamesOwned[]) => void;
}


export const AppContext = React.createContext({} as AppContextState);

export const AppContextProvider: FC = (props) => {
  const [game, setGame] = useState<Game>();
  const [games, setGames] = useState<Game[]>([]);
  const [user, setUser] = useState<User>();
  const [users, setUsers] = useState<User[]>([]);
  const [gameOwned, setGameOwned] = useState<GamesOwned>();
  const [gamesOwned, setGamesOwned] = useState<GamesOwned[]>([]);

  return (
      <AppContext.Provider
        value={{
          game, setGame,
          games, setGames,
          user, setUser,
          users, setUsers,
          gameOwned, setGameOwned,
          gamesOwned, setGamesOwned,

  }}
        >
        {props.children}

      </AppContext.Provider>
  );
};
