import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import axios from "axios";
import {Button, Grid, Paper} from "@mui/material";
import {useParams} from "react-router";

const StyledGameView = styled.div `
  &.game { 
    margin: 15px;
    
    .game-content {
      padding: 15px;
      letter-spacing: 1px;

    }
  }
`

export const GameView = (props) => {
  const {addGameToCollection} = props;
  const [game, setGame] = useState(null);
  const { id: gameId } = useParams();

  useEffect(() => {
    getGame(gameId);

  }, []);

  const getGame = async (gameId) => {
    console.log("get all games owned function start, user: " + gameId);
    let response = await axios.get(`http://127.0.0.1:8000/api/games/${gameId}/`)
    setGame(response.data);
  }

  if (!game) {
    return <>Loading</>;
  }

  return (
    <StyledGameView className="game">
        <Paper elevation={4}>
          <div className="game-content">
            <img src={game.image} alt=""/>

            <p>Title: {game.title}</p>
            <p>Publisher: {game.publisher}</p>
            <p>Genre: {game.genre}</p>
            <p>System: {game.system}</p>
            <p>Release Date: {game.release_date}</p>
            <p>Value: {game.value}</p>
          </div>
        </Paper>
    </StyledGameView>
  )
}
