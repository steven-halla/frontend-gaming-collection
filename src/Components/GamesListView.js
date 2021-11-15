import React, {useState} from "react"
import styled from "styled-components";
import {Button, Grid, Paper, TextField} from "@mui/material";
import {Link} from "react-router-dom";

const StyledGameListView = styled.div`
  margin-left: 10px;

  .wrapper {
    p {
      font-size: larger;
      font-weight: bold;
      font-family: Blippo, fantasy;
    }

    .games-list {
      display: flex;
      flex-flow: row wrap;

      .games-list-item {
        .game-content {
          padding: 15px;
          letter-spacing: 1px;
        }
      }
    }
  }
`

export const GamesListView = (props) => {
  const {games, addGameToCollection} = props;
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGames = games.filter((game) => {
    if (!searchQuery) {
      return true;
    }

    return (
      game.title.toLowerCase().includes(searchQuery.toLocaleLowerCase()) ||
      String(game.value).toLowerCase().includes(searchQuery.toLocaleLowerCase()) ||
      game.system.toLowerCase().includes(searchQuery.toLocaleLowerCase()) ||
      game.genre.toLowerCase().includes(searchQuery.toLocaleLowerCase())
    );
  });

  return (
    <StyledGameListView>
      <div className="wrapper">

        <TextField
          type="text"
          id="filled-hidden-label-normal"
          defaultValue=""
          variant="filled"
          placeholder="Search by game info"
          onChange={(event) => {
            setSearchQuery(event.target.value);
          }}
        />

        <Grid className="games-list" container spacing={2}>
          {filteredGames.map((game) =>
            <GameListItem
              game={game}
              addGameToCollection={addGameToCollection}
            />
          )}
        </Grid>

      </div>
    </StyledGameListView>
  );
}

const GameListItem = (props) => {
  const {game, addGameToCollection} = props;

  return (
    <Grid key={game.id} item className="games-list-item" xs={12} md={6} lg={4} xl={3}>
      <Paper elevation={4}>
        <div className="game-content">
          <img src={game.image} alt=""/>
          <p>Title:{game.title}</p>
          <p>Publisher: {game.publisher}</p>
          <p>Genre: {game.genre}</p>
          <p>System: {game.system}</p>
          <p>Release Date: {game.release_date}</p>
          <p>Value: {game.value}</p>
          <p>Rating: {game.rating}</p>
          <Link to={`/games/${game.id}`}>View game</Link><br/><br/>
          <Button variant="outlined"
            onClick={() => addGameToCollection(game.id)}
          >
            Add to game collection
          </Button>
        </div>
      </Paper>
    </Grid>
  )
}
