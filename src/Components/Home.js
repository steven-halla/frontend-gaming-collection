import React from "react";
import styled from "styled-components";
import {Footer} from "./Footer";


const StyledHome = styled.div`
  .wrapper {
    height: 100vh;
    
    .main-text {
      display: flex;
      align-content: center;
      justify-content: center;
      height: 30vh;
      
      .maintext-content {
        font-family: Copperplate;
        letter-spacing: 2px;
        font-size: large;
        height: 24vh;
        width: 60vh;
      }
    }
    
    .main-image-box {
      display: flex;
      width: 100%;
      height: 70vh;
      
      .image-container {
        height: 70vh;
        width: 70vh;
        
        img {
          height: 70vh;
          width: 70vh;
        }
      }
      
      .image-container-middle {
        height: 40vh;
        width: 80vh;
        
        img {
          height: 40vh;
          width: 80vh;
        }
      }
      
      .image-container-2 {
        height: 30vh;
        width: 20vh;
        margin-left: auto;
      }

  
      
      .image-box-message-container {
        padding-left: 12px;
        height: 50vh;
        width: 50vh;
        font-family: "Times New Roman";
        letter-spacing: 2px;
        font-size: x-large;
      }

      .image-box-message-container-2 {
        
        height: 20vh;
        width: 30vh;
      }
      
      
    }
    
    .third-container {
      height: 45vh;
    }
    
    //.footer {
    //  height: 20vh;
    //}
    //
  }
  
`

export const Home = (props) => {
  const user = props.user;

  return (
    <StyledHome>
      <div className="wrapper">
        <div className="main-text">
          <div className="maintext-content">
              <p>Welcome to Game Booky. We are an gaming collections app for people that love video games
              .Simply search through our list of games, and click a button to add it to your collection.
                To get started simply register(it takes less than a minute) and then you can begin to
                add games to your collection.
              </p>
          </div>
        </div>
        <div className="main-image-box">
          <div className="image-container">
            <img src="https://i.pinimg.com/originals/0b/78/5a/0b785a4b2ff7d0e1c22dc1d59c30eb91.jpg" alt="nintendo tapes"/>
          </div>
          <div className="image-box-message-container">
            <p>How often have you been to a pawn shop, flea market or game store and
            saw a game but wasn't sure if it was in your collection?  With Game Booky you
            can easily track games you own, and add new games you purchased straight to your collection
            with a simple search and button click. </p>
          </div>
          <div className="image-container-middle">
            <img src="https://howchoo.com/media/y2/vm/zj/harvest-moon.jpeg?width=900&auto=webp&quality=70" alt=""/>
          </div>
          <div className="image-box-message-container">
            <p>Curious as to if a game is any good or not? With game booky you can leave reviews
            for games that are in your collection as well as check out other user reviews. Now you'll know if that
            200 dollar game is worth buying.</p>
          </div>
        </div>

        <div className="footer">
           <Footer />

        </div>
      </div>
    </StyledHome>
  )
}
