import React, { Component } from 'react';
import parseResults from '../services/parseResults';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({
            inputValue: e.target.value
        });
        console.log(this.state.inputValue);
    }

    render() {
        return (
            <form className="mb-3" id="search-bar" onSubmit={this.props.handleSubmit}>
                <input
                    id="searchBar"
                    type="text"
                    name="searchBar"
                    placeholder="Search..."
                    value={this.state.inputValue}
                    onChange = {this.handleChange}
                    required></input>
                <button id="submit-btn" type="submit" className="btn btn-dark">Submit</button>
            </form>
        )
    }
}

export default SearchBar;