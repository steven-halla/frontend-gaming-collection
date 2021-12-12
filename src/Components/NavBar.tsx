import React, {FC, PropsWithChildren, ReactNode} from "react";
import {Link} from "react-router-dom";
import {deleteAuthToken} from "../Auth";
import {useNavigate} from "react-router";
import styled from "styled-components";
import {User} from "../model/User";

const StyledNavBar = styled.div`
  .links {
    width: 100%;
    height: 60px;
    background-color: #61dafb;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    
    .link {
      padding: 10px;
      font-family: "Impact";
      font-size: x-large;
      
      a {
        color: black;
        text-decoration: none;
        
        :visited {
          text-decoration: none;
        }
      }
      
      :last-child {
        margin-left: auto;
      }
    }
    
    .app-title {
      font-family: sans-serif;
      font-size: x-large;
      margin: auto;
    }
  }
`;

interface NavBarProps {
  user: User;
  setUser: (user: User | undefined) => void;
  // isCool: (user: User) => boolean;
}

export const NavBar: FC<NavBarProps> = (props) => {
  const {user, setUser} = props;

  const navigate = useNavigate();

  const handleLogoutClick = () => {
    deleteAuthToken();
    setUser(undefined);
    navigate("");
  }

  return (
    <StyledNavBar>
      <div className="links">
        <div className="link">
          <Link to="/">Home</Link>
        </div>
        <div className="link">
          <Link to="/games">Games List View</Link>
        </div>
        <div className="link">
          <Link to="/profile">Profile view</Link>
        </div>
        <div className="app-title">
          <p>Game Booky</p>
        </div>
        {
          user != null ? (
            <div className="link" onClick={() => handleLogoutClick()}>
              <Link to="#">Logout</Link>
            </div>
          ) : (
            <div className="link">
              <Link to="/login">Login</Link> / <Link to="/register">Register</Link>
            </div>
          )
        }
      </div>
    </StyledNavBar>
  )
}