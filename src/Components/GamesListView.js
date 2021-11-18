import React, {useState} from "react"
import styled from "styled-components";
import {Button, Grid, Paper, TextField} from "@mui/material";
import {Link} from "react-router-dom";
import clsx from "clsx";

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
      
        .paper {
          height: 850px;
          background-color: #fff;
          
          :hover {
            background-color: #eee;
            //border: 2px solid black;
            box-shadow: 5px 5px gray;
          }
        }

        .game-content {
          padding: 15px;
          letter-spacing: 1px;

          //object-fit: and object cover;create div for image container 

        }
        
        // overrides for if owned. this css selector will match any element that has BOTH the games-list-item class AND the owned class (e.g. className="games-list-item owned")
        &.owned {
          .paper {
            background-color: #cec;
            
            :hover {
              background-color: #9e9;
            }
        }
      }
    }
  }
`

export const GamesListView = (props) => {
  const {games, addGameToCollection, gamesOwned} = props;

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
              gamesOwned={gamesOwned}
            />
          )}
        </Grid>

      </div>
    </StyledGameListView>
  );
}

const GameListItem = (props) => {
  const {game, addGameToCollection, gamesOwned} = props;

  // 1. filter will return true if the game we are rendering's id (game.id) matches a game id from any of my owned games.
  // 2. gamesOwned.filter(...) will return an array of GamesOwned objects that match id. Only one game could match, so we determine if the game is owned by whether or not the filter returns at least one match
  const isGameOwned = gamesOwned.filter((gameOwned) => {
    return gameOwned.game.id === game.id
  }).length > 0;

  return (
    <Grid key={game.id} item className={clsx("games-list-item", isGameOwned ? "owned" : null)} xs={12} md={6} lg={4}
          xl={3}>
      <Paper className="paper" elevation={4}>
        <div className="game-content">
          <img src={game.image} alt=""/>
          <p>Title:{game.title}</p>
          <p>Publisher: {game.publisher}</p>
          <p>Genre: {game.genre}</p>
          <p>System: {game.system}</p>
          <p>Release Date: {game.release_date}</p>
          <p>Value: {game.value}</p>
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
