import React, {useState} from "react"

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
    <div>
      <p>Hi Im a search bar</p>
      <input
        type="text"
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
