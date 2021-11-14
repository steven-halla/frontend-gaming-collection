import React, {useState} from "react"
import styled from "styled-components";
import {TextField} from "@mui/material";

const StyledGameListView = styled.div`
  margin-left: 10px;
  
`
export const GamesListView = (props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const {addGameToCollection} = props;

  console.log(props.games);

  const filteredGames = props.games
    .filter(game => {
      // if no search query is present, always match the game
      if (!searchQuery) {
        return true;
      }
      const doesQueryMatch = game.title.toLowerCase().includes(searchQuery.toLocaleLowerCase()) ||
        game.genre.toLowerCase().includes(searchQuery.toLocaleLowerCase());

      return doesQueryMatch;
    });

  return (
    <StyledGameListView>
      <div>

        <TextField
          type="text"
          id="filled-hidden-label-normal"
          defaultValue="Game Search"
          variant="filled"
          placeholder="Search by game info"
          onChange={(event) => {
            setSearchQuery(event.target.value);
          }}
        />
        <table>
          {filteredGames.map((game) => (
            <GameListItem
              game={game}
              addGameToCollection={addGameToCollection}
            />
          ))}
        </table>
      </div>
    </StyledGameListView>

  );

}

const GameListItem = (props) => {
  const {game, addGameToCollection} = props;

  return (
    <tr key={game.id}>
      <td>
        <div className="border">
          <img src="" alt=""/>
          <p>Title:{game.title}</p>
          <p>Publisher: {game.publisher}</p>
          <p>Genre: {game.genre}</p>
          <p>System: {game.system}</p>
          <p>Release Date: {game.release_date}</p>
          <p>Value: {game.value}</p>
          <p>Rating: {game.rating}</p>
          <a href="/games/${gameid}">Game View</a>
        </div>
      </td>
      <td>
        <button
          onClick={() => addGameToCollection(game.id)}
        >
          Add to game list
        </button>
      </td>

    </tr>
  )
}
