import React, { useState } from "react";

export const Login = (props) => {
  const [loginUser, setLoginUser] = useState({username: "", password: ""});

  const handleChange = (event) => {
    console.log("Inside handle Change")
    setLoginUser( previousState => ({
      ...previousState,
      [event.target.name] : event.target.value
    }));
  }

  const handleSubmit = (event) => {
    console.log("Inside Handle Submit", loginUser);
    props.login(loginUser)
    window.location = '/';
  }

  return(
    <div>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="username">username</label>
        <input type="username"
               className = "login-Input"
               name="username"
               value={loginUser.username}
               onChange={handleChange}
               type="text"
        />
        <br/>
        <label htmlFor="password">password</label>
        <input type="password"
               className = "password-input"
               name="password"
               value={loginUser.password}
               onChange={handleChange}
               type="text"
        />
        <button type="submit">submit</button>
      </form>
    </div>
  );

}
