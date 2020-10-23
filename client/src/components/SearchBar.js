import React, { Component } from 'react';
import parseResults from '../services/parseResults';

function SearchBar(props) { 

    return (
        <form className="mb-3" id="search-bar" onSubmit={props.handleSubmit}>
            <input
                id="searchBar"
                type="text"
                name="searchBar"
                placeholder="Search..."
                value={props.inputValue}
                onChange={props.handleChange}
                required></input>
            <button id="submit-btn" type="submit" className="btn btn-dark">Submit</button>
        </form>
    )
}

export default SearchBar;