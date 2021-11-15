import React, {useState} from 'react';
import {GamesPieChart} from "./GamesPieChart";
import {GamesBarChart} from "./GamesBarChart";
import _ from "lodash";
import styled from "styled-components";
import {Button, Grid, Paper} from "@mui/material";
import IconButton from '@mui/material/IconButton';


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
  
   };

 }
 
`

export const ProfileView = (props) => {
  const {user, gamesOwned} = props;
  console.log(gamesOwned);

  const totalGameValue = gamesOwned
    .map(ownedGame => ownedGame.game.value)
    .reduce((a, b) => a + b, 0);

  // const gameValuePieChartData = [
  //   { name: 'Group A', value: 400 },
  //   { name: 'Group B', value: 300 },
  //   { name: 'Group C', value: 300 },
  //   { name: 'Group D', value: 200 },
  // ];

  const gameValuePieChartData = gamesOwned
    .map(ownedGame => ({
      name: ownedGame.game.title,
      value: ownedGame.game.value
    }))
    .sort((a, b) => a.value - b.value);

  // group by release date, results in object like:
  // {"2001":[{"id":1,"game":{...}], "2002":[...]}
  const gamesByReleaseYear = _.groupBy(gamesOwned, ownedGame => {
    return ownedGame.game.release_date; // release_date is release year as an int
  });

  const gamesReleaseYearData = Object
    .entries(gamesByReleaseYear)
    .map(gamesForYear => { // gamesForYears is an array of [year, GamesOwned[]]
      const year = gamesForYear[0];
      const gamesOwned = gamesForYear[1]; // array of games owned (verified in debugger)
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
    .map(gamesForSystem => { // gamesForYears is an array of [system, GamesOwned[]]
      const system = gamesForSystem[0];
      const gamesOwned = gamesForSystem[1]; // array of games owned (verified in debugger)
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
    // const rating = parseInt(gamesOwned.review);
    //
    // const newReview = {
    //   review : newReview,
    //   // might need to use parse int for start rating for value
    //   rating : rating,
    //
    // }

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
            // rename "id" as "ownedGameId" when destructuring from "ownedGame"
            const {id: gamesOwnedId, game, owner_rating, review} = ownedGame;



            return (

              <Grid key={game.id} item className="games-list-item" xs={12} md={6} lg={4} xl={3}>
                <Paper elevation={4}>
                <tr>
                  <td>
                    {/*<p>Id: {gamesOwnedId}</p>*/}
                    <div className="returned-games">

                      <p>Id: {game.id}</p>
                      <p>Title: {game.title}</p>
                      <p>Rating: {owner_rating}</p>
                      <p>Review: {review}</p>
                      <p>Genre: {game.genre}</p>
                      <p>Value: {game.value}</p>
                      <Button variant="outlined"

                      onClick={() => props.deleteGame(gamesOwnedId)}>Delete</Button>
                    </div>

                    {/*<form action="" onSubmit={handleSubmit}>*/}
                    {/*  <p>Leave or update a review:</p>*/}
                    {/*  <label htmlFor="review">Review</label>*/}
                    {/*  <input type="text" value={ownedGame.review} />*/}
                    {/*  <label htmlFor="">Rating:</label>*/}
                    {/*  <select name="starRating" id="starRating" value={ownedGame.owner_rating}  onChange={handleChange} >*/}
                    {/*    <option value="1">1</option>*/}
                    {/*    <option value="2">2</option>*/}
                    {/*    <option value="3">3</option>*/}
                    {/*    <option value="4">4</option>*/}
                    {/*    <option value="5">5</option>*/}
                    {/*  </select>*/}
                    {/*  <Button type="submit">submit changes</Button>*/}
                    {/*</form>*/}
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
