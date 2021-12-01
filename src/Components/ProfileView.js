import React, {useState} from 'react';
import {GamesPieChart} from "./GamesPieChart";
import {GamesBarChart} from "./GamesBarChart";
import _ from "lodash";
import styled from "styled-components";
import {Button, Grid, Paper} from "@mui/material";

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

   };
 }
`

export const ProfileView = (props) => {
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


  const gamesByReleaseYear = _.groupBy(gamesOwned, ownedGame => {
    return ownedGame.game.release_date;
  });

  const gamesReleaseYearData = Object
    .entries(gamesByReleaseYear)
    .map(gamesForYear => {
      const year = gamesForYear[0];
      const gamesOwned = gamesForYear[1];
      const gamesOwnedCount = gamesOwned.length;
      return {
        name: year,
        value: gamesOwnedCount
      }
    });

  const gamesBySystem = _.groupBy(gamesOwned, ownedGame => {
    return ownedGame.game.system;
  });
  const gamesBySystemData = Object
    .entries(gamesBySystem)
    .map(gamesForSystem => {
      const system = gamesForSystem[0];
      const gamesOwned = gamesForSystem[1];
      const gamesOwnedCount = gamesOwned.length;
      return {
        name: system,
        value: gamesOwnedCount
      }
    });

  const [review, setReview] = useState({
    body : " ",
    starRating : " "

  });

  const handleChange = (event) => {
    setReview(previousState => ({
      ...previousState,
      [event.target.name] : event.target.value
    }) );
  }

  const handleSubmit = (event) => {
    event.preventDefault();

  }



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
      <div className="game-value-by-system-data">
        <h3>Game Count by System</h3>
        <GamesBarChart data={gamesBySystemData}/>
      </div>
    </div>
      <table>
      <Grid container spacing={2}>
          {gamesOwned.map((ownedGame) => {
            const {id: gamesOwnedId, game, owner_rating, review} = ownedGame;

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
                      {/*<Button variant="outlined"*/}
                      {/*onClick={() => deleteGameFromCollection(gamesOwnedId)}>Delete</Button>*/}
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
