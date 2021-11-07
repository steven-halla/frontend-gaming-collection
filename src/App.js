import './App.css';
import React, {useState} from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Register} from "./Components/Register";
import {Login} from "./Components/Login";

// auth helper functions
const getAuthToken = () => {
  return localStorage.getItem('token');
}

const setAuthToken = (token) => {
  localStorage.setItem('token', token);
}

const getLoggedInUserId = () => {
  const token = getAuthToken();

  if (!token) {
    alert("token is null");
    return null;
  }

  const decodedJwt = jwtDecode(token);
  alert("djwt" + JSON.stringify(decodedJwt));
  console.log("decodedJwt", decodedJwt);

  return decodedJwt.user_id;
}

const getUserDetails = async (userId) => {
  // const jwt = localStorage.getItem('token');
  console.log("User id", userId)
  try {
    let response = await axios.get(`http://127.0.0.1:8000/api/auth/users/${userId}`);
    console.log("*** RESPONSE DATA ****", response.data);
    return response.data;
  }
  catch (e) {
    console.log("Error with the userDetails", e)
  }
}

export const App = () => {
  const [user, setUser] = useState(null);

  const loginUser = async (loginRequest) => {
  console.log("Inside loginUser function app.js");
  console.log("loginRequest", loginRequest);
  try {
    // first login
    const response = await axios.post('http://127.0.0.1:8000/api/auth/login/', loginRequest);
    console.log("login response", response);
    setAuthToken(response.data.access);

    // get user based on jwt.id (the user's id)
    const userId = getLoggedInUserId();
    const user = await getUserDetails(userId);
    console.log("login user", user);
    setUser(user);

    window.location = '/';

  } catch (error) {
    console.log('error with logged in user', error);
    return error
  }
}

  const registerUser = async (registerRequest) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/auth/register/' , registerRequest);
      await loginUser({
        userName: registerRequest.userName,
        password: registerRequest.password
      });
    //  window.location = '/register';
    } catch(error) {
      console.log(error, 'error with register user');
    }
  }

  return (
    <div>
      <header>
        {JSON.stringify(user)}
        <Router>
          <Routes>
            <Route exact path="/register" element={<Register registerUser={registerUser} />} />
            <Route exact path="/login" element={<Login loginUser={loginUser} />} />
            <Route exact path="/" element={<>index</>} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}


{/*<Route path="/login" render={props => <Login {...props} loginUser={this.loginUser} /> } />*/}

//  let token = () => {
//   const jwt = localStorage.getItem('token');
//   try  {
//     const user = jwtDecode(jwt);
//     this.setState({
//       userLoggedIn: user
//     });
//     return user.id;
//   }catch(error){
//     console.log(error, "error with token function");
//   }
// }



// const loginUser = async (loggedInUserObject) => {
//   console.log("Inside loginuser function app.js line 10");
//   console.log("object", loggedInUserObject)
//   try {
//     const response = await axios.post('https://localhost:44394/api/authentication/login/', loggedInUserObject);
//     localStorage.setItem('token', response.data.token);
//     this.token();
//     this.getUserDetails(this.state.userLoggin.id);
//     console.log("login state user: ", this.state.userLoggedIn)
//   } catch(error) {
//     console.log(error, 'error with logged in user');
//     return error
//   }
// }
