import React, {useState} from 'react';

export const Register = (props) => {
  const [registerNewUser, setRegisterNewUser] = useState({
    username : "",
    password : "",
    email : "",
    first_name : "",
    last_name : "",
    middle_name : "",
    favorite_game : ""
  });

  const handleChange = (event) => {
    setRegisterNewUser(previousState => (
      {...previousState,
      [event.target.name] : event.target.value
      }
    ));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    props.registerNewUser(registerNewUser)
  }

  return(
    <div>
        <div className = "Register-Container">

          <form action="" onSubmit={handleSubmit} >
            <label for="">User Name</label>
            <input className = "Register-Input" name="username" value={registerNewUser.username} onChange={handleChange} type="text"/>
            <br/>
            <label htmlFor="">Last Name</label>
            <input className = "Register-Input"  name="password" value={registerNewUser.password} onChange={handleChange} type="text"/>
            <br/>
            <label htmlFor="">User Name</label>
            <input className = "Register-Input" name="email" value={registerNewUser.email} onChange={handleChange} type="text"/>
            <br/>
            <label htmlFor="">Password</label>
            <input className = "Register-Input" name="first_name" value={registerNewUser.first_name} onChange={handleChange} type="text"/>
            <br/>
            <label htmlFor="">Email</label>
            <input className = "Register-Input" name="last_name" value={registerNewUser.last_name} onChange={handleChange} type="text"/>
            <br/>
            <label htmlFor="">Phone Number</label>
            <input className = "Register-Input" name="middle_name" value={registerNewUser.middle_name} onChange={handleChange} type="text"/>
            <br/>
            <label htmlFor="">Favorite Game</label>
            <input className = "Register-Input" name="favorite_game" value={registerNewUser.favorite_game} onChange={handleChange} type="text"/>
            <button type="submit">Create Account</button>
          </form>
        </div>
    </div>
  );
}
