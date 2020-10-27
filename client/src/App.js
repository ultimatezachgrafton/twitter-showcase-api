import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import TwitterCard from "./components/TwitterCard";
import SearchBar from "./components/SearchBar";
import RandomButton from "./components/RandomButton"
import TwitterList from "./components/TwitterList"

const randomPossibilities = ["nasa", "npr", "bbc", "nytimes", "latimes"];

class App extends Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            tweets: [],
            inputValue: '',
            searchData: '',
            randomChoice: '',
            tweetsReady: false
        }
        this.handleRandom = this.handleRandom.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.checkTweetsReady = this.checkTweetsReady.bind(this);
    }

    handleChange(event) {
        this.setState({
            inputValue: event.target.value
        });
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.setState({
            loading: true
        })
        await axios.get(`/api/search`, {
            params: {
                q: this.state.inputValue
            }
        })
            .then(async (res) => {
                const statuses = res;
                console.log("search get: " + statuses.data.statuses);
                this.setState({
                    tweets: [...statuses.data.statuses]
                });

                console.log("response data search: " + this.state.tweets[0].text)
            })
            .then(this.setState({
                loading: false
            }))
            .then(
                this.checkTweetsReady()
            )
            .catch(error => {
                console.log(error);
                this.setState({
                    loading: false
                })
            });
    }

    async handleRandom(event) {
        event.preventDefault();
        // randomly select one
        const random = Math.floor(Math.random() * randomPossibilities.length);
        console.log(random, randomPossibilities[random]);

        const randomChoice = randomPossibilities[random];
        this.setState({
            loading: true
        })
        await axios.get(`/api/random`, {
            params: {
                q: randomChoice
            }
        })
            .then(async (res) => {
                const statuses = res;
                console.log("random get: " + statuses.data.statuses);
                this.setState({
                    tweets: [ ...statuses.data.statuses ]
                });
                // undefined - why?
                console.log("response data random: " + this.state.tweets[0].text)
            })
            .then(this.setState({
                loading: false
            }))
            .then(
                this.checkTweetsReady()
            )
            .catch(error => {
                console.log(error);
                this.setState({
                    loading: false
                })
            });
    }

    checkTweetsReady() {
        if ((this.state.tweets.length > 0) && (!this.state.loading)) {
            this.setState({
                tweetsReady: true
            })
        }
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
                {/* <TwitterList props = {this.state.tweets}/> */}
                <div>
                    {this.state.tweetsReady ? <TwitterCard tweets={this.state.tweets} className="twitter-card" id='twitter-card' key={this.state.tweets.id}>
                    {this.state.tweets.map(tweet => <div>{this.state.tweets}</div>)} </TwitterCard> : null }
                
                </div>
            </div>
        );
    }
}

export default App

// TODO:
// 1 - RandomButton (minor)
// 2 - properly hide keys? if andy says so
// 3 - make array map list
// 4 - css