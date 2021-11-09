import './App.css';
import React, {useState, useEffect} from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Register} from "./Components/Register";
import {Login} from "./Components/Login";
import {Home} from "./Components/Home";
import {NavBar} from "./Components/NavBar";

// auth helper functions


export const App = () => {
  const [user, setUser] = useState(null);

  const getAuthToken = () => {
    return localStorage.getItem('token');
  }

  const setAuthToken = (token) => {
    localStorage.setItem('token', token);
  }



  const getLoggedInUserId = async () => {
    const token = getAuthToken();

    if (!token) {
      alert("token is null");
      return null;
    }

    setUser(jwtDecode(token));
    // alert("djwt" + JSON.stringify(decodedJwt));
    // console.log("decodedJwt", decodedJwt);
    //
    // return decodedJwt.user_id;
  }

  const getUserDetails = async (userId) => {
    // const jwt = localStorage.getItem('token');
    console.log("User id", userId)
    try {
      let response = await axios.get(`http://127.0.0.1:8000/api/auth/users/${userId}/`);
      alert(JSON.stringify(response.data));
      // localStorage.getItem('token', response.data);
      console.log("*** RESPONSE DATA ****", response.data);
      return response.data;
    }
    catch (e) {
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


    // get user based on jwt.id (the user's id)
    //const user = await getUserDetails(user);
    // console.log("login user", user);
    // setUser(user);


  } catch (error) {
    console.log('error with logged in user', error);
    return error
  }
}
 useEffect(()=>{
   getLoggedInUserId()
   console.log(user)
 }, [user])




  const registerUser = async (registerRequest) => {
    console.log(registerRequest)
    try {
      console.log("try clause")
      const response = await axios.post('http://127.0.0.1:8000/api/auth/register/' , registerRequest);
      console.log("line 78");
      await loginUser({
        'username': registerRequest.username,
        'password': registerRequest.password
      });
      console.log(registerRequest, "line 82");
    window.location = '/register';
    } catch(error) {
      console.log(error, 'error with register user');
    }
  }

  return (
    <div>
      <header>

        {JSON.stringify(user)}
        <Router>
          <NavBar />

          <Routes>
            <Route exact path="/" element={<Home username={user} setUser={setUser}/>} />
            <Route exact path="/register" element={<Register registerUser={registerUser} />} />
            <Route exact path="/login" element={<Login loginUser={loginUser} />} />
            {/*<Route exact path="/" element={<>index</>} />*/}
          </Routes>
        </Router>
      </header>
    </div>
  );
}

