import React from "react";
import styled from "styled-components";


const StyledHome = styled.div`
  .wrapper {
    
    background-color: honeydew;
    height: 100vh;
    
    .main-text {
      display: flex;
      background-color: blue;
      height: 30vh;
      
      .maintext-content {
        background-color: gold;
        height: 10vh;
        width: 40vh;
      }
    }
    
    .main-image-box {
      display: flex;
      background-color: red;
      width: 100%;
      height: 30vh;
      
      .image-container {
        background-color: violet;
        height: 30vh;
        width: 20vh;
      }
      
      .image-container-2 {
        background-color: rebeccapurple;
        height: 30vh;
        width: 20vh;
        margin-left: auto;
      }
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
          <div className="maintext-content">
              <p>I am a content box that will have the main paragraph for this site</p>
          </div>
        </div>

        <div className="main-image-box">
          <div className="image-container">

          </div>

          <div className="image-container-2">
            <p>I am image container 2</p>
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
