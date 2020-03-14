import React, { useState } from 'react';
import Search from './components/Search';
import Results from './components/Results';
import Popup from './components/Popup';
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

  const openPopup = id => {
    axios(apiurl + '&i=' + id)
      .then(({data}) => {
        let result = data;

        setState(prevState => {
          return { ...prevState, selected: result}
        });
      });
  }

  const closePopup = () => {
    setState(prevState => {
      return { ...prevState, selected: {}}
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
        {(typeof state.results != 'undefined') ?<Results results={state.results} openPopup={openPopup}/>: <h1> No movies are found. Try another word for search</h1>}

        {(typeof state.selected.Title != 'undefined') ? <Popup selected={state.selected} closePopup={closePopup}/> : null}
      </main>
    </div>
  );
}

export default App;
