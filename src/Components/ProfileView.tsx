import React, {FC} from 'react';
import {GamesPieChart} from "./GamesPieChart";
import {GamesBarChart} from "./GamesBarChart";
import styled from "styled-components";
import {Button, Grid, Paper} from "@mui/material";
import {User} from "../model/User";
import {GamesOwned} from "../model/GamesOwned";
import _ from "lodash";
import {Game, Year} from "../model/Game";

const StyledProfileView = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 25px;

  .profile-info {
    margin: 0 auto;

    p {
      font-size: larger;
      font-weight: bold;
      font-family: Blippo, fantasy;
    }
  }

  .chart-container {
    margin: 0 auto;

    .game-value-by-genre {
      display: flex;
      justify-content: center;
    }
  }

  .returned-games {
    p {
      display: flex;
      font-size: larger;
      font-weight: bold;
      font-family: Blippo, fantasy;
      letter-spacing: 1px;

    }
  ;
  }
`

interface ProfileViewProps {
  user: User;
  gamesOwned: GamesOwned[];
  deleteGameFromCollection: any;
  ownedGame: Game;
}

export const ProfileView: FC<ProfileViewProps> = (props) => {
  const {user, gamesOwned, deleteGameFromCollection} = props;
  console.log(gamesOwned);


  const totalGameValue = gamesOwned
    .map(ownedGame => ownedGame.game.value)
    .reduce((a, b) => a + b, 0);

  const gameValuePieChartData = gamesOwned
    .map(ownedGame => ({
      name: ownedGame.game.title,
      value: ownedGame.game.value
    }))
    .sort((a, b) => a.value - b.value);

  // group the gamesOwned[] by release date
  // This will generate a object with keys that are the date and the value you will an ownedGame.
  interface GamesOwnedByYear {
    [key: Year]: GamesOwned[];
  }

  const gamesByReleaseYear: GamesOwnedByYear = _.groupBy(gamesOwned, (ownedGame: GamesOwned) => {
    return ownedGame.game.release_date;
  });

  interface ChartData {
    name: string;
    value: number;
  }

  const gamesReleaseYearData: ChartData[] = Object
    // gamesByReleaseYear is an object with keys of type Year and value of GamesOwned.
    // entries will let us map over each of those key value pairs in the object (or map)
    .entries(gamesByReleaseYear)
    // now with each Year -> GamesOwned pairing (aka "entry" of a map/object)
    // we are returning a new object that contains the release year and total games for that year
    // {name: year, value: gamesOwnedCount}
    .map((gamesForYear: [string, GamesOwned[]]) => {
      const year: string = gamesForYear[0];
      const gamesOwned: GamesOwned[] = gamesForYear[1];
      const gamesOwnedCount = gamesOwned.length;
      return {
        name: year,
        value: gamesOwnedCount
      };
    });


  interface GamesOwnedBySystem {
    [key: string]: GamesOwned[];
  }

  const gamesBySystem: GamesOwnedBySystem = _.groupBy(gamesOwned, (ownedGame: GamesOwned) => {
    return ownedGame.game.system;
  });

  const gamesBySystemData = Object
    .entries(gamesBySystem)
    .map((gamesForSystem: [string, GamesOwned[]]) => {
      const system: string = gamesForSystem[0];
      const gamesOwned: GamesOwned[] = gamesForSystem[1];
      const gamesOwnedCount = gamesOwned.length;
      return {
        name: system,
        value: gamesOwnedCount
      };
    });

  return (
    <StyledProfileView>
      <div className="profile-info">
        <p>Welcome {user?.username}</p>
        <p>My favorite game: {user?.favorite_game}</p>
        <p>Total value of collection is: {totalGameValue} </p>
      </div>

      <div className="chart-container">
        <div className="game-value-by-genre">
          <GamesPieChart data={gameValuePieChartData}/>
        </div>
        <div className="game-value-by-release-year">
          <h3>Game Count by Release Year</h3>
          <GamesBarChart data={gamesReleaseYearData}/>
        </div>
        rfd
        <div className="game-value-by-system-data">
          <h3>Game Count by System</h3>
          <GamesBarChart data={gamesBySystemData}/>
        </div>
      </div>
      <table>

        <Grid container spacing={2}>
          {gamesOwned.map((ownedGame) => {
              const {game, owner_rating, review} = ownedGame;

              const onDeleteGameFromCollection = () => {
                deleteGameFromCollection(game.id);
              }

              return (
                <Grid key={game.id} item className="games-list-item" xs={12} md={6} lg={4} xl={3}>
                  <Paper elevation={4}>
                    <tr>
                      <td>
                        <div className="returned-games">
                          <p>Title: {game.title}</p>
                          <p>Rating: {owner_rating}</p>
                          <p>Review: {review}</p>
                          <p>Genre: {game.genre}</p>
                          <p>Value: {game.value}</p>
                          <Button variant="outlined"
                                  onClick={onDeleteGameFromCollection}>Delete</Button>
                        </div>
                      </td>
                    </tr>
                  </Paper>
                </Grid>
              );
            }
          )}
        </Grid>
      </table>
    </StyledProfileView>
  )
}
