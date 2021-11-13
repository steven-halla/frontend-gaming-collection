import React, { useState } from "react";
import styled from "styled-components";



const LoginDiv = styled.div`

.LoginContainer{
  width: 100%;
  // height: 100%;
  background-color: #eeeeee;
  color: red;
  display:flex; 
  justify-content:center;
  align-items:center;
  height:100vh;

}

.loginInput{
  width: 100%;
  padding: 12px 20px;
  // margin: 8px;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box
}
`

export const Login = (props) => {
  const [loginRequest, setLoginRequest] = useState({username: "", password: ""});

  const handleChange = (event) => {
    console.log("Inside handle Change")
    setLoginRequest( previousState => ({
      ...previousState,
      [event.target.name] : event.target.value
    }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Inside Handle Submit", loginRequest);
    props.loginUser(loginRequest);
  }

  return (
    <div>
      <LoginDiv>
        <div className="LoginContainer">
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">username</label>
            <input className="loginInput"
                   name="username"
                   value={loginRequest.username}
                   onChange={handleChange}
                   type="text"
            />
            <br/>
            <label htmlFor="password">password</label>
            <input className="password-input"
                   name="password"
                   value={loginRequest.password}
                   onChange={handleChange}
                   type="password"
            />
            <button type="submit">submit</button>
          </form>
        </div>
      </LoginDiv>
    </div>

  );

}
