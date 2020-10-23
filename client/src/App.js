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
        this.displaySearchTweet = this.displaySearchTweet.bind(this);
        this.displayRandomTweet = this.displayRandomTweet.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            inputValue: event.target.value
        });
        console.log(this.inputValue);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({
            searchData: this.state.inputValue
        })
        console.log('inner app: ' + this.state.inputValue);
        this.handleSearchTweet();
    }

    // show results from search
    async displaySearchTweet() {
         // send data to api for searching
         axios.get('/api/tweet-search')
         .then(response => {
             console.log("handlesearch: " + response.data.statuses);
             this.setState({
                 tweets: response.data.statuses
             })
         })
         .catch(error => {
             console.log(error);
         });
    }

    // show results from random
    // makwe a list of five users, randomly choose which one to show
    async displayRandomTweet() {
        fetch('/api/tweet-random')
            .then((resp) => resp.json()) // Transform data into json
            .then((data) => {
                this.setState({ tweets: data.statuses });
            });
    }

    render() {
        return (
            <div className="App">
                <div className="topnav">
                    <h1>re:Tweeted</h1>
                    <SearchBar
                        handleChange={this.handleChange}
                        handleSubmit={this.handleSubmit} />
                </div>
                <button onClick={this.displayRandomTweet}>Click 4 random Tweet</button>
                <div className="twitter-card" id='twitter-card'>
                    {this.state.tweets.length > 0 ? this.state.tweets.text : null}
                </div>
            </div>
        );
    }
}

export default App