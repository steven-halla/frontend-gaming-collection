import React, { useState } from "react";

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
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">username</label>
        <input className="login-Input"
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
  );

}
