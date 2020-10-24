import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
// import TwitterCard from "./components/TwitterCard";
import SearchBar from "./components/SearchBar";
import RandomButton from "./components/RandomButton"

const randomPossibilities = ["nasa", "npr", "bbc", "nytimes", "caterpillarlab"];

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
        axios.get(`/api/search`, {
            params: {
                q: this.state.inputValue
            }
        })
            .then(async (res) => {
                const statuses = JSON.stringify(res.data.statuses);
                console.log(statuses);
                this.setState({
                    tweets: [statuses]
                });

                console.log("response data search: " + this.state.tweets)
            })
            .catch(error => {
                console.log(error);
            });
    }

    async handleRandom() {

        // randomly select one
        const random = Math.floor(Math.random() * randomPossibilities.length);
        console.log(random, randomPossibilities[random]);

        const randomChoice = randomPossibilities[random];

        axios.get(`/api/random`, {
            params: {
                q: randomChoice
            }
        })
            .then(async (response) => {
                const random = JSON.stringify(response.data.statuses);
                this.setState({
                    tweets: random
                });
                console.log("response data random: " + this.state.tweets)
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
                    {this.state.tweets.length > 0 ? this.state.tweets : null}
                </div>
            </div>
        );
    }
}

export default App

// TODO: minor bits
// 1 - RandomButton
// 2 - properly hide keys