import './App.css';
import React, {useEffect, useState} from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Register} from "./Components/Register";
import {Login} from "./Components/Login";
import {Home} from "./Components/Home";
import {NavBar} from "./Components/NavBar";
import {getAuthToken, setAuthToken} from "./Auth";
import {GamesListView} from "./Components/GamesListView";
import {SearchBar} from "./Components/SearchBar";
import {ProfileView} from "./Components/ProfileView";


export const App = () => {
  const [user, setUser] = useState(null);
  const [games, setGames] = useState([]);
  const [gamesOwned, setGamesOwned] = useState([]);


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

    return decodedJwt.user_id;
  }

  const getUser = async (userId) => {
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

  const loginUser = async (loginRequest) => {
    console.log("Inside loginUser function app.js");
    console.log("loginRequest", loginRequest);
    try {
      // first login
      const response = await axios.post('http://127.0.0.1:8000/api/auth/login/', loginRequest);
      console.log("login response", response);
      setAuthToken(response.data.access);
      window.location = '/';

    } catch (error) {
      console.log('error with logged in user', error);
      return error
    }
  }

  const registerUser = async (registerRequest) => {
    console.log(registerRequest)
    try {
      console.log("try clause")
      const response = await axios.post('http://127.0.0.1:8000/api/auth/register/', registerRequest);
      console.log("line 78");
      await loginUser({
        'username': registerRequest.username,
        'password': registerRequest.password
      });
      console.log(registerRequest);
      window.location = '/';

    } catch (error) {
      console.log(error, 'error with register user');
    }
  }

  const getAllGames = async () => {
    console.log("get all games function start");
    return axios.get(`http://127.0.0.1:8000/api/games/`);
  }

  const getAllGamesOwned = async (userId) => {
    console.log("get all games owned function start, user: " + userId);
    let response = await axios.get(`http://127.0.0.1:8000/api/games_owned/user/${userId}/`)
    setGamesOwned(response.data);
  }

  const deleteGame = async (gamesOwnedId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/games_owned/${gamesOwnedId}/`);
      console.log("i just did an axios call for delete")
     // await getAllGamesOwned(user.id);

      // instead of reloading all games owned via getAllGamesOwned which updates the gamesOwned state,
      // I'm deleting the game from the gamesOwned state by id.
      setGamesOwned(
        gamesOwned.filter(game => game.id !== gamesOwnedId)
      );

    } catch (ex) {
      console.log('Error in Delete Call', ex);
    }
  }


  return (
    <div>
      <header>
        <Router>
          <NavBar user={user} setUser={setUser} />

          <Routes>
            <Route exact path="/" element={<Home user={user} setUser={setUser}/>}/>
            <Route exact path="/register" element={<Register registerUser={registerUser}/>}/>
            <Route exact path="/login" element={<Login loginUser={loginUser}/>}/>
            <Route exact path="/profile" element={<ProfileView user={user} gamesOwned={gamesOwned} deleteGame={deleteGame} /> }/>
            <Route exact path="/games" element={<GamesListView games={games} />  }/>

            {/*<Route exact path="/" element={<>index</>} />*/}

          </Routes>
        </Router>
      </header>
    </div>
  );
}

