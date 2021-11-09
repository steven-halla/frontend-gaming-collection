import React, {useState} from 'react';

export const SearchBar = (props) => {
  const [searchQuery, setSearchQuery] = useState("");



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
        {props.games
          .filter((foundGames) => {
            if (searchQuery === "") {
              return foundGames;
            } else if (
              foundGames.title
                .toLowerCase()
                .includes(searchQuery.toLocaleLowerCase()) ||
              foundGames.genre
                .toLowerCase()
                .includes(searchQuery.toLocaleLowerCase())
            ) {
              return foundGames;
            }
          })
          .map((game) => (
            <tr key={game.id}>
              <td>
                <div className="border">
                  <p>Title:{game.title}</p>
                  <p>Value: {game.value}</p>
                  <p>Genre: {game.genre}</p>
                </div>
              </td>
            </tr>
          ))}
      </table>
    </div>
  );
};











