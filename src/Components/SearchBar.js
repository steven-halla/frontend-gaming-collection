import React, {useState} from 'react';

export const SearchBar = (props) => {
  const {setSearchResults} = props;
  const [searchQuery, setSearchQuery] = useState("");

  const searchGames = async (searchQuery) => {
    return response.data;
  }

  const searchAndSetGameListState = async (event) => {
    event.preventDefault();
    const games = await searchGames(searchQuery);
    setSearchResults(games);
  }

  return (
    <div>
      <h1>Video Games Search</h1>
      <form action="" method="get" onSubmit={searchAndSetGameListState}>
      <input type="text" name="search" value="searchQuery" onChange={(e) => setSearchQuery(e.target.value)}/>
      <button type="submit" onClick={searchAndSetGameListState}>Search</button>
      </form>
    </div>
  )
}
