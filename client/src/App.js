import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
// import TwitterCard from "./components/TwitterCard";
import SearchBar from "./components/SearchBar";
import RandomButton from "./components/RandomButton"

const randomPossibilities = ["nasa"];

class App extends Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            tweets: [],
            inputValue: '',
            searchData: '',
            randomChoice: ''
        }
        this.handleRandom = this.handleRandom.bind(this);
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
        axios.get(`/api/search`).then(async (response) => {
            this.setState({
                tweets: response.data
            });
            console.log(response.data)
        })
            .catch(error => {
                console.log(error);
            });
    }

    handleRandom() {
        console.log("click");

        // randomly select one
        // const random = Math.floor(Math.random() * randomPossibilities.length);
        // console.log(random, randomPossibilities[random]);

        this.setState({
            randomChoice: 'nasa'//randomPossibilities[random]
        })

        axios.get('/api/tweet-random')
            .then(async (response) => {
                this.setState({
                    tweets: response.data
                });
                console.log(response.data)
            })
            .catch(error => {
                console.log(error);
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
                <button className="btn btn-dark" onClick={this.handleRandom}>Click 4 random Tweet</button>
                <div className="twitter-card" id='twitter-card'>
                    {this.state.tweets.length > 0 ? this.state.tweets.text : null}
                </div>
            </div>
        );
    }
}

export default App