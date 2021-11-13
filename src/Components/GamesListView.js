import React, {useState} from "react"

export const GamesListView = (props) => {
  const [searchQuery, setSearchQuery] = useState("");

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
          <tr key={game.id}>
            <td>
              <div className="border">
                <p>Title:{game.title}</p>
                <p>Value: {game.value}</p>
                <p>Genre: {game.genre}</p>
              </div>
            </td>
            <td>
              <button

                // onClick={() => props.addGameToCollection(game.id)}
              >
                Add to game list
              </button>
            </td>

          </tr>
        ))}
      </table>
    </div>
  );

}
