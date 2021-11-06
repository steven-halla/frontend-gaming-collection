import './App.css';
import React from 'react';
import axios from 'axios';
import {Route, Redirect, Switch} from 'react-router-dom';
import {Register} from "./Components/Register";



export const App = () => {


  const registerNewUser = async (userToBeRegisteredObject) => {
    try {
      const response = await axios.post('https://localhost:44394/api/authentication' , userToBeRegisteredObject);
      loginUser({'userName' : userToBeRegisteredObject.userName, 'password': userToBeRegisteredObject.password })
      window.location = '/register';
    } catch(error) {
      console.log(error, 'error with register user');
    }
  }



  return (
    <div>
      <header>
        <Switch>
          <Route path="/register" render={props => <Register {...props} registerNewUser={registerNewUser} /> } />
        </Switch>
        <Redirect to = "/" />

      </header>
    </div>
  );
}

export default App;



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
