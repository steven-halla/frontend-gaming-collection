import React from "react";
import {Link} from "react-router-dom";

export const NavBar = () => {
  return (
    <div>
      <nav>
        <Link to="/">
          <button>Home</button>
        </Link>
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/register">
          <button>Register</button>
        </Link>
      </nav>
    </div>
  )
}
