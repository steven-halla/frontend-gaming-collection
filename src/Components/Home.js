import React from "react";
import styled from "styled-components";


const StyledHome = styled.div`
  .wrapper {
    background-color: honeydew;
    height: 100vh;
    
    .main-text {
      background-color: blue;
      height: 30vh;
    }
    
    .image-container-1 {
      background-color: red;
      height: 40vh;
    }
    
    .third-container {
      background-color: green;
      height: 45vh;
    }
    
    .footer {
      background-color: brown;
      height: 20vh;
    }
    
  }
  
`

export const Home = (props) => {
  const user = props.user;

  return (
    <StyledHome>
      <div className="wrapper">

        <div className="main-text">

        </div>
        <div className="image-container-1">
          <div className="image-container">

          </div>
          <div>

          </div>
          <div>

          </div>
        </div>
        <div className="third-container">
          <div className="left-content">

          </div>
          <div className="middle-content">

          </div>
          <div className="right-content">

          </div>
        </div>

        <div className="image-3">
          <div className="centered-content">

          </div>
        </div>
        <div className="footer">

        </div>
      </div>
    </StyledHome>
  )
}
