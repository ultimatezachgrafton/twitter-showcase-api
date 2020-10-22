import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
// import TwitterCard from "./components/TwitterCard";
import SearchBar from "./components/SearchBar";

class App extends Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            tweets: [],
            searchData: '',
        }
        this.displaySearchTweet = this.displaySearchTweet.bind(this);
        this.displayRandomTweet = this.displayRandomTweet.bind(this);
        this.searchTweet = this.searchTweet.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        event.preventDefault();
        this.setState({
            searchData: event.target
        })
        console.log('inner app: ' + this.state.searchData);
    };

    // show results from search
    displaySearchTweet() {
        fetch('/api/tweet-search')
            .then((resp) => resp.json()) // Transform data into json
            .then((data) => {
                this.setState({ tweets: data.statuses });
            });
    }

    // show results from random
    displayRandomTweet() {
        fetch('/api/tweet-random')
        .then((resp) => resp.json()) // Transform data into json
        .then((data) => {
            this.setState({ tweets: data.statuses });
        });
    }

    async searchTweet(event) {
        event.preventDefault();
    }

    render() {
        return (
            <div className="App">
                <div className="topnav">
                    <h1>re:Tweeted</h1>
                    <SearchBar
                        handleChange={this.handleChange}
                        searchTweet={this.searchData} />
                </div>
                <button onClick={this.displaySearchTweet}>Click 4 tweets</button>
                <button onClick={this.displayRandomTweet}>Click 4 random</button>
                <div className="twitter-card" id='twitter-card'>
                    {this.state.tweets.length > 0 ? this.state.tweets[0].text : null}
                </div>
            </div>
        );
    }
}

export default App