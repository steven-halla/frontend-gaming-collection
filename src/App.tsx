import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Register} from "./Components/Register";
import {Login} from "./Components/Login";
import {Home} from "./Components/Home";
import {NavBar} from "./Components/NavBar";
import {GamesListView} from "./Components/GamesListView";
import {ProfileView} from "./Components/ProfileView";
import {GameView} from "./Components/GameView";
import {useLoadLoggedInUser} from "./hooks/useLoadLoggedInUser";

export const App = () => {

  useLoadLoggedInUser();

  return (
    <div>
      <header>
          <Router>
            <NavBar />
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/profile" element={<ProfileView/>}/>
              <Route path="/games" element={<GamesListView />}/>
              <Route path="/games/:id" element={<GameView/>}/>
            </Routes>
          </Router>
      </header>
    </div>
  );
}

