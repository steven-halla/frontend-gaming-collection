import React, {ChangeEvent, FC, FormEventHandler, useContext, useEffect, useState} from 'react';
import {GamesPieChart} from "./GamesPieChart";
import {GamesBarChart} from "./GamesBarChart";
import styled from "styled-components";
import {Button, Grid, Paper} from "@mui/material";
import {GamesOwned} from "../model/GamesOwned";
import _ from "lodash";
import {Year} from "../model/Game";
import {AppContext} from "../context/AppContext";
import {getLoggedInUserId} from "../Auth";
import {getGameValue} from "../service/getGameValue";
import {changeValue} from "../service/ChangeValue";

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

export const ProfileView: FC = () => {

  const {user, gamesOwned, getAllGamesOwned, deleteGameFromCollection} = useContext(AppContext);

  useEffect(() => {
    const userId = getLoggedInUserId();
    getAllGamesOwned(userId);
  }, []);

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

  if (!user) {
    return <>Loading</>;
  }

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
              const {game, notes} = ownedGame;

              const onDeleteGameFromCollection = () => {
                deleteGameFromCollection(user.id, game.id);
              }

              const gameValue: number = getGameValue(ownedGame);

              return (
                <Grid key={game.id} item className="games-list-item" xs={12} md={6} lg={4} xl={3}>
                  <Paper elevation={4}>
                    <tr>
                      <td>
                        <div className="returned-games">

                          <p>Title: {game.title}</p>
                          <p>Genre: {game.genre}</p>
                          <p><strong>${gameValue}</strong></p>
                          <p>Notes: {notes}</p>
                          <Button
                            variant="outlined"
                            onClick={onDeleteGameFromCollection}
                          >
                            Delete
                          </Button>
                          <NotesEdit userId={user.id} gameId={game.id} defaultNotes={ownedGame.notes} />
                          <FixedValueEdit userId={user.id} gameId={game.id} defaultValue={gameValue} />
                        </div>
                      </td>
                    </tr>
                  </Paper>
                </Grid>
              );
            }
          )};
        </Grid>
      </table>
    </StyledProfileView>
  )
}


interface FixedValueEditProps {
  userId: number;
  gameId: number;
  defaultValue: number;
}

const FixedValueEdit: FC<FixedValueEditProps> = (props) => {
  const {userId, gameId, defaultValue} = props;

  const [fixedValue, setFixedValue] = useState<number>(defaultValue);

  const onFixedValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFixedValue(Number(event.target.value));
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    console.log("Inside handle submit");
    alert("update value to: " + fixedValue)
    .then(changeValue(event));
  }

  return (
    <form action="" onSubmit={handleSubmit}>
      <label htmlFor="">Value</label>
      <input type="number" value={fixedValue} onChange={onFixedValueChange}/>
      <button type="submit">Save</button>
    </form>
  );
}


interface NotesEditProps {
  userId: number;
  gameId: number;
  defaultNotes: string;
}

const NotesEdit: FC<NotesEditProps> = (props) => {
  const {userId, gameId, defaultNotes} = props;

  const [notes, setNotes] = useState<string>(defaultNotes);

  const onNoteChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNotes(event.target.value);
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    console.log("Inside handle submit");
    alert("update notes to: " + notes);
  }

  return (
    <form action="" onSubmit={handleSubmit}>
      Note: <input type="text" value={notes} onChange={onNoteChange}/>
      <button type="submit">Save</button>
    </form>
  );
}
