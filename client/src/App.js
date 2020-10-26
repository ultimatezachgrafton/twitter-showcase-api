import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import TwitterCard from "./components/TwitterCard";
import SearchBar from "./components/SearchBar";
import RandomButton from "./components/RandomButton"
import TwitterList from "./components/TwitterList"

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

    async handleSubmit(event) {
        event.preventDefault();
        this.setState ({
            loading:true
        })
        await axios.get(`/api/search`, {
            params: {
                q: this.state.inputValue
            }
        })
            .then(async (res) => {
                const statuses = res;
                console.log(statuses.data.statuses);
                let tweetArray= [];
                for (const tweet of statuses.data.statuses) {
                    // const t = JSON.parse(tweet);
                    tweetArray.push(tweet);
                }
                console.log("ta: " + tweetArray);
                this.setState({
                    tweets: [ tweetArray ]
                });

                console.log("response data search: " + this.state.tweets.text)
            })
            .then(this.setState ({
                    loading:false
                }))
            .catch(error => {
                console.log(error);
                this.setState ({
                    loading: false
                })
            });
    }

    handleRandom(event) {
        event.preventDefault();
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
                const statuses = JSON.stringify(response.data.statuses);
                console.log("response data statuses random: "+ statuses)
                this.setState({
                    tweets: [statuses]
                });

                // undefined - why?
                console.log("response data random: " + this.state.tweets.statuses)
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
                {/* <TwitterList props = {this.state.tweets}/> */}
                <div className="twitter-list" id='twitter-list'>
                    {/* { (this.state.loading) && (this.state.tweets.length > 0) ? "...fetching..." : <TwitterCard/> } */}
                    { this.state.tweets.length > 0 ? this.state.tweets[0].created_at : null}
                </div>
            </div>
        );
    }
}

export default App

// TODO:
// 1 - RandomButton (minor)
// 2 - properly hide keys
// 3 - make array map list
// 4 - css