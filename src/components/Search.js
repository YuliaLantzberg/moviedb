import React from 'react';

const Search = (props) => {
    return (
        <section className="searchbox-wrap">
            <input 
                type="text" 
                placeholder="Search for a movie..." 
                className="searchbox"
                onChange={props.input}
                onKeyPress={props.search}/>
        </section>
    )
}

export default Search;