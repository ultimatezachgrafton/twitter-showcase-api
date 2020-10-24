import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
// import TwitterCard from "./components/TwitterCard";
import SearchBar from "./components/SearchBar";

class App extends Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            tweets: [],
            inputValue: '',
            searchData: ''
        }
        this.handleRandomTweet = this.handleRandomTweet.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            inputValue: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log('handleSubmit: ' + this.state.inputValue);
        
        // show results from search
        // send data to api for searching
        axios.get(`/api/search?search_term=${this.state.inputValue}`).then(async (response) => {
            this.setState({
                tweets: response.data
            });
            console.log(response.data)
        })
            .catch(error => {
                console.log(error);
            });
    }

    // show results from random
    // makwe a list of five users, randomly choose which one to show
    async handleRandomTweet() {
        fetch('/api/tweet-random')
            .then((resp) => resp.json()) // Transform data into json
            .then((data) => {
                this.setState({ tweets: data.statuses });
            });
    }

    render() {
        return (
            <div className="App" >
                <div className="topnav">
                    <h1>re:Tweeted</h1>
                    <SearchBar
                        handleChange={this.handleChange}
                        handleSubmit={this.handleSubmit} />
                </div>
                <button onClick={this.handleRandomTweet}>Click 4 random Tweet</button>
                <div className="twitter-card" id='twitter-card'>
                    {this.state.tweets.length > 0 ? this.state.tweets.text : null}
                </div>
            </div>
        );
    }
}

export default App