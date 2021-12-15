import './App.css';
import React, {useEffect, useState} from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Register} from "./Components/Register";
import {Login} from "./Components/Login";
import {Home} from "./Components/Home";
import {NavBar} from "./Components/NavBar";
import {getAuthToken} from "./Auth";
import {GamesListView} from "./Components/GamesListView";
import {ProfileView} from "./Components/ProfileView";
import {GameView} from "./Components/GameView";
import {User} from "./model/User";
import {Game} from "./model/Game";
import {AppContextProvider} from "./context/AppContext";

export const App = () => {
  const [user, setUser] = useState<any>(null);
  const [games, setGames] = useState<any>([]);
  const [gamesOwned, setGamesOwned] = useState<any[]>([]);

  useEffect(() => {
    const userId = getLoggedInUserId();
    if (userId != null) {
      console.log("logged in user id: " + userId);
      getUser(userId).then(user => {
        console.log("logged in user: " + JSON.stringify(user));
        setUser(user);
      });
    }
  }, []);

  useEffect(() => {
    getAllGames()
      .then(response => {
        setGames(response.data);
      });
  }, []);

  useEffect(() => {
    const userId = getLoggedInUserId();
    getAllGamesOwned(userId);
  }, []);

  const getLoggedInUserId = () => {
    const token = getAuthToken();
    if (!token) {
      console.log("token is null");
      return null;
    }
    const decodedJwt = jwtDecode(token);
    console.log("decodedJwt", decodedJwt);
    // @ts-ignore
    return decodedJwt.user_id;
  }


  const getUser = async (userId: number) => {
    // const jwt = localStorage.getItem('token');
    console.log("User id", userId)
    try {
      let response = await axios.get(`http://127.0.0.1:8000/api/auth/users/${userId}/`);
      console.log('user:', response.data);
      return response.data;
    } catch (e) {
      console.log("Error with the userDetails", e)
    }
  }

  const getAllGames = async () => {
    console.log("get all games function start");
    return axios.get(`http://127.0.0.1:8000/api/games/`);
  }

  const getAllGamesOwned = async (userId: number) => {
    console.log("get all games owned function start, user: " + userId);
    let response = await axios.get(`http://127.0.0.1:8000/api/games_owned/users/${userId}/`)
    setGamesOwned(response.data);
  }

// added user id to async
  const addGameToCollection = async (user: User, gameId: number) => {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/games_owned/users/${user.id}/games/${gameId}/`);
      console.log("adding game to your collection");
      getAllGamesOwned(user.id);
      console.log(response);

    } catch (ex) {
      console.log('erorr in add call', ex);
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
    <div>
      <header>
        <AppContextProvider>
          <Router>
            <NavBar user={user} setUser={setUser}/>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/profile" element={<ProfileView
                user={user}
                gamesOwned={gamesOwned}
                deleteGameFromCollection={deleteGameFromCollection}
              />}/>
              <Route path="/games" element={<GamesListView
                user={user}
                games={games}
                gamesOwned={gamesOwned}
                addGameToCollection={addGameToCollection}
                deleteGameFromCollection={deleteGameFromCollection}
              />}/>
              <Route path="/games/:id" element={<GameView/>}/>
            </Routes>
          </Router>
        </AppContextProvider>
      </header>
    </div>
  );
}

