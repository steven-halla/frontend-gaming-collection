import React, {ChangeEventHandler, FC, FormEventHandler, useState} from 'react';
import styled from "styled-components";
import {Button} from "@mui/material";
import {RegisterRequest, registerUser} from "../service/registerUser";

const RegisterDiv = styled.div`

  .RegisterContainer {
    width: 100%;
    background-color: #eeeeee;
    color: red;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 120vh;


    .RegisterBox {
      height: 60vh;
      width: 80vh;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid black;
      padding: 10px;
      box-shadow: 12px 17px #888888;

      .Input {
        width: 100%;
        padding: 12px 20px;
        // margin: 8px;
        display: inline-block;
        border: 1px solid #ccc;
        box-sizing: border-box
      }
    }
  }
`


export const Register: FC = () => {

  const [registerRequest, setRegisterRequest] = useState<RegisterRequest>({
    username: "",
    password: "",
    email: "",
    first_name: "",
    last_name: "",
    middle_name: ""
  });

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setRegisterRequest(previousState => (
      {
        ...previousState,
        [event.target.name]: event.target.value
      }
    ));
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    registerUser(registerRequest);
  }

  return (
    <RegisterDiv>
      <div className="RegisterContainer">
        <div className="RegisterBox">
          <form action="" onSubmit={handleSubmit}>
            <label htmlFor="">User Name</label>
            <input className="Input" name="username" value={registerRequest.username} onChange={handleChange}
                   type="text"/>
            <br/>
            <label htmlFor="">Password</label>
            <input className="Input" type="password" name="password" value={registerRequest.password}
                   onChange={handleChange}/>
            <br/>
            <label htmlFor="">Email</label>
            <input className="Input" name="email" value={registerRequest.email} onChange={handleChange} type="text"/>
            <br/>
            <label htmlFor="">First Name</label>
            <input className="Input" name="first_name" value={registerRequest.first_name} onChange={handleChange}
                   type="text"/>
            <br/>
            <label htmlFor="">Last Name</label>
            <input className="Input" name="last_name" value={registerRequest.last_name} onChange={handleChange}
                   type="text"/>
            <br/>
            <label htmlFor="">Middle Name</label>
            <input className="Input" name="middle_name" value={registerRequest.middle_name} onChange={handleChange}
                   type="text"/>
            <br/>

            <Button variant="outlined" type="submit">Create Account</Button>
          </form>
        </div>
      </div>
    </RegisterDiv>
  );
}
