import React, {ChangeEventHandler, FormEvent, FormEventHandler, useState} from "react";
import styled from "styled-components";
import {Button} from "@mui/material";
import {FC} from "react";
import {LoginRequest, loginUser} from "../service/loginUser";

const LoginDiv = styled.div`

  .login-container {
    width: 100%;
    background-color: #eeeeee;
    color: red;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;

    .login-box {
      height: 40vh;
      width: 80vh;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid black;
      padding: 10px;
      box-shadow: 12px 17px #888888;

      .input {
        width: 100%;
        padding: 12px 20px;
        display: inline-block;
        border: 1px solid #ccc;
        box-sizing: border-box;
      }
    }
  }
`

export const Login: FC = () => {

  const [loginRequest, setLoginRequest] = useState<LoginRequest>({username: "", password: ""});

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    console.log("Inside handle Change")
    setLoginRequest((previousState: LoginRequest) => ({
      ...previousState,
      [event.target.name] : event.target.value
    }));
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    console.log("Inside Handle Submit", loginRequest);
    loginUser(loginRequest);
  }

  return (
    <div>
      <LoginDiv>
        <div className="login-container">
          <div className="login-box">
            {/*drill into on submit and on change to find the types for formevent handler and changeevent handler*/}
            <form onSubmit={handleSubmit}>
              <label htmlFor="username">username</label>
              <input className="input"
                     name="username"
                     value={loginRequest.username}
                     onChange={handleChange}
                     type="text"
              />
              <br/>
              <label htmlFor="password">password</label>
              <input className="input"
                     name="password"
                     value={loginRequest.password}
                     onChange={handleChange}
                     type="password"
              />
              <Button variant="outlined"  type="submit">submit</Button>
            </form>
          </div>
        </div>
      </LoginDiv>
    </div>
  );
}
