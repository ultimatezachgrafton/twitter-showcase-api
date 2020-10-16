import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
// import TwitterCard from "./components/TwitterCard";
// import SearchBar from "./components/SearchBar";

class App extends Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            tweets: [],
        }
        this.displayTweet = this.displayTweet.bind(this);
    }

    displayTweet() {
        fetch('/api/tweet')
        .then((resp) => resp.json()) // Transform data into json
        .then(function(data) {
            console.log(data);
        });

    }

    render() {
        return (
            <div className="App">
                <div className="topnav">
                    <h1>re:Tweeted</h1>
                    {/* <SearchBar
                        characterSearch={this.state.characterSearch}
                        searchCharacter={this.searchCharacter}
                        handleChange={this.handleChange} /> */}
                </div>
                <button onClick={this.displayTweet}>Click 4 tweets</button>
                {/* <div className="twitter-card">
                    {this.state.tweets[0]} */}
                    {/* {(this.state.loading) ? "... loading ..." :
                        <TwitterCard
                            key={this.state.characters}
                            tweets={this.state.characters} 
                            />} */}
                {/* </div> */}
            </div>
        );
    }
}

export default App