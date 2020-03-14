import React, { useState } from 'react';
import Search from './components/Search';
import axios from 'axios';

function App() {
  const [state, setState] = useState({
    searchQuery: '',
    results: [],
    selected: {}
  });
  const apiurl = 'http://www.omdbapi.com/?apikey=d913ad58';

  const searchHandler = (event) => {
    if(event.key ==='Enter') {
      axios(apiurl + '&s=' + state.searchQuery)
        .then(({data}) => {
          let results = data.Search;
          setState(prevState => {
            return { ...prevState, results: results}
          });
        });
    }
  }

  const inputHandler = (event) => {
    let query = event.target.value;

    setState(prevState => {
      return {...prevState, searchQuery: query}
    });
  }
  return (
    <div className="App">
      <header>
        <h1>Movie Database</h1>
      </header>
      <main>
        <Search 
          input={inputHandler}
          search={searchHandler}/>
      </main>
    </div>
  );
}

export default App;
