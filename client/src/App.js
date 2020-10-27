import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import SearchBar from "./components/SearchBar";
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
                console.log("search get: " + statuses.data );
                this.setState({
                    tweets: [ statuses.data ]
                });

                console.log("response data search: " + this.state.tweets[0].text);
                console.log("length: " + this.state.tweets.length)
            })
            .then(this.setState({
                loading: false
            }))
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
                console.log("random get: " + statuses.data);
                this.setState({
                    tweets: [ statuses.data ]
                });
                console.log("response data random: " + this.state.tweets[0].text);
                console.log("id: " + this.state.tweets[0].id);
            })
            .then(this.setState({
                loading: false
            }))
            .catch(error => {
                console.log(error);
                this.setState({
                    loading: false
                })
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
                <div>
                    { this.state.tweets.length > 0 ? <TwitterList tweets={this.state.tweets}/> : null }
                </div>
            </div>
        );
    }
}

export default App