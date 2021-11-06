import React, {useState} from 'react';

export const RegisterUser = (props) => {
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
            <label for="">First Name</label>
            <input className = "Register-Input" name="FirstName" value={registerUsers.FirstName} onChange={handleChange} type="text"/>
            <br/>
            <label htmlFor="">Last Name</label>
            <input className = "Register-Input"  name="LastName" value={registerUsers.LastName} onChange={handleChange} type="text"/>
            <br/>
            <label htmlFor="">User Name</label>
            <input className = "Register-Input" name="UserName" value={registerUsers.UserName} onChange={handleChange} type="text"/>
            <br/>
            <label htmlFor="">Password</label>
            <input className = "Register-Input" name="Password" value={registerUsers.Password} onChange={handleChange} type="text"/>
            <br/>
            <label htmlFor="">Email</label>
            <input className = "Register-Input" name="Email" value={registerUsers.Email} onChange={handleChange} type="text"/>
            <br/>
            <label htmlFor="">Phone Number</label>
            <input className = "Register-Input" name="PhoneNumber" value={registerUsers.PhoneNumber} onChange={handleChange} type="text"/>
            <button type="submit">Create Account</button>
          </form>
        </div>
    </div>
  )
}
