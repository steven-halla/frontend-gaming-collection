import React, {FC, useEffect, useState} from 'react';
import styled from "styled-components";
import axios from "axios";
import {Button, Grid, Paper} from "@mui/material";
import {useParams} from "react-router";
import {Game} from "../model/Game";

const StyledGameView = styled.div `
  &.game { 
    margin: 15px;
    
    .game-content {
      padding: 15px;
      letter-spacing: 1px;

    }
  }
`

export const GameView: FC = () => {
  const [game, setGame] = useState<Game>();
  const { id: gameId } = useParams();

  useEffect(() => {
    loadGame(Number(gameId));

  }, []);

  const loadGame = async (gameId: number) => {
    console.log("get all games owned function start, user: " + gameId);
    let response = await axios.get(`http://127.0.0.1:8000/api/games/${gameId}/`);
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
