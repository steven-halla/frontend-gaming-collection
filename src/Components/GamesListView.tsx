import React, {FC, useState} from "react"
import styled from "styled-components";
import {Button, Grid, Paper, TextField} from "@mui/material";
import {Link} from "react-router-dom";
import clsx from "clsx";
import {Game} from "../model/Game";
import {GamesOwned} from "../model/GamesOwned";

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

        :hover {
          cursor: pointer;
        }

        .paper {
          height: 850px;
          background-color: #fff;

          :hover {
            background-color: #eee;
            box-shadow: 5px 5px gray;
          }
        }

        .game-content {
          padding: 15px;
          letter-spacing: 1px;
          
          .image-container {
            overflow: hidden;
          }
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
  }
`

interface GamesListViewProps {
  games: Game[];
  // game: Game;
  gamesOwned: GamesOwned[];
  addGameToCollection: any;
  deleteGameFromCollection: any;
  // deleteGameFromCollection: GamesOwned[];

}

export const GamesListView: FC<GamesListViewProps> = (props) => {
  const {games, gamesOwned, addGameToCollection, deleteGameFromCollection} = props;

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
              gamesOwned={gamesOwned}
              addGameToCollection={addGameToCollection}
              deleteGameFromCollection={deleteGameFromCollection}
             gameOwned={game}/>
          )}
        </Grid>
      </div>
    </StyledGameListView>
  );
}

interface GameListItemProps {
  game: Game;
  gamesOwned: GamesOwned[];
  gameOwned: Game;
  addGameToCollection: any;
  deleteGameFromCollection: any;
}

const GameListItem: FC<GameListItemProps> = (props) => {
  const {game, gamesOwned, addGameToCollection, deleteGameFromCollection} = props;

  const filteredGamesOwned = gamesOwned.filter((gameOwned) => {
    return gameOwned.game.id === game.id
  });
  const isGameOwned = filteredGamesOwned.length > 0;

  const onAddGameToCollection = () => {
    addGameToCollection(game.id);
  }

  const onDeleteGameFromCollection = () => {
    deleteGameFromCollection(game.id);
  }

  return (
    <Grid key={game.id} item className={clsx("games-list-item", isGameOwned ? "owned" : null)} xs={12} md={6} lg={4}
          xl={3}>
      <Paper className="paper" elevation={4}>
        <div className="game-content">
          <div className="image-container">
            <img src={game.image} alt=""/>
          </div>
          <p>Title:{game.title}</p>
          <p>Publisher: {game.publisher}</p>
          <p>Genre: {game.genre}</p>
          <p>System: {game.system}</p>
          <p>Release Date: {game.release_date}</p>
          <p>Value: {game.value}</p>
          <Link to={`/games/${game.id}`}>View game</Link><br/><br/>

          {!isGameOwned ? (
            <Button variant="outlined" onClick={onAddGameToCollection}>
              Add
            </Button>
          ) : (
            <Button variant="outlined" onClick={onDeleteGameFromCollection}>
              Remove
            </Button>
          )}
        </div>
      </Paper>
    </Grid>
  )
}
