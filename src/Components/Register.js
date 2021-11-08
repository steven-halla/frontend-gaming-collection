import React, {useState} from 'react';

export const Register = (props) => {
  const [registerRequest, setRegisterRequest] = useState({
    username : "",
    password : "",
    email : "",
    first_name : "",
    last_name : "",
    middle_name : "",
    favorite_game : ""
  });

  const handleChange = (event) => {
    setRegisterRequest(previousState => (
      {...previousState,
      [event.target.name] : event.target.value
      }
    ));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    props.registerUser(registerRequest);
  }

  return(
    <div>
        <div className = "Register-Container">

          <form action="" onSubmit={handleSubmit} >
            <label htmlFor="">User Name</label>
            <input className = "Register-Input" name="username" value={registerRequest.username} onChange={handleChange} type="text"/>
            <br/>
            <label htmlFor="">Password</label>
            <input className = "Register-Input"  name="password" value={registerRequest.password} onChange={handleChange} type="text"/>
            <br/>
            <label htmlFor="">Email</label>
            <input className = "Register-Input" name="email" value={registerRequest.email} onChange={handleChange} type="text"/>
            <br/>
            <label htmlFor="">First Name</label>
            <input className = "Register-Input" name="first_name" value={registerRequest.first_name} onChange={handleChange} type="text"/>
            <br/>
            <label htmlFor="">Last Name</label>
            <input className = "Register-Input" name="last_name" value={registerRequest.last_name} onChange={handleChange} type="text"/>
            <br/>
            <label htmlFor="">Middle Name</label>
            <input className = "Register-Input" name="middle_name" value={registerRequest.middle_name} onChange={handleChange} type="text"/>
            <br/>
            <label htmlFor="">Favorite Game</label>
            <input className = "Register-Input" name="favorite_game" value={registerRequest.favorite_game} onChange={handleChange} type="text"/>
            <button type="submit">Create Account</button>
          </form>
        </div>
    </div>
  );
}
