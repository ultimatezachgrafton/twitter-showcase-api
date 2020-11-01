import React, { Component } from "react";
import TwitterList from "./components/TwitterList";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import MessageBanner from "./components/MessageBanner";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

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
            context: "welcome"
        }
        this.handleRandom = this.handleRandom.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUserSearch = this.handleUserSearch.bind(this);
        this.handleKeywordSearch = this.handleKeywordSearch.bind(this);
    }

    handleSubmit = (inputValue, searchType) => {
        this.setState({
            loading: true,
            context: "searching"
        });
        searchType === 'Username' ? this.handleUserSearch(inputValue) : this.handleKeywordSearch(inputValue);
    }

    handleUserSearch(inputValue) {
        axios.get(`/api/search/user`, {
            params: {
                q: inputValue
            }
        })
            .then(async (res) => {
                const statuses = res.data.statuses;
                await this.setState({
                    tweets: [statuses]
                });
                console.log(this.state.tweets);
            })
            .then(this.setState({
                loading: false
            }),
            )
            .catch (error => {
            console.log(error);
            this.setState({
                loading: false
            })
        })
    }

    handleKeywordSearch(inputValue) {
        axios.get(`/api/search/keyword`, {
            params: {
                q: inputValue
            }
        })
            .then(async (res) => {
                const statuses = res.data.statuses;
                await this.setState({
                    tweets: [statuses]
                });
                console.log(this.state.tweets);
            })
            .then(this.setState({
                loading: false
            }),
            )
            .catch (error => {
            console.log(error);
            this.setState({
                loading: false
            })
        })
    }

    handleRandom = () => {
        const random = Math.floor(Math.random() * randomPossibilities.length);
        const randomChoice = randomPossibilities[random];
        this.setState({
            loading: true,
            context: "searching"
        })
        axios.get(`/api/random`, {
            params: {
                q: randomChoice
            }
        })
            .then(async (res) => {
                const statuses = res.data.statuses;
                await this.setState({
                    tweets: [statuses]
                });
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
                <NavBar className="topnav" handleSubmit={this.handleSubmit} />
                <div className="div-list">
                    {this.state.tweets.length > 0 ? <TwitterList tweets={this.state.tweets} /> : <MessageBanner context={this.state.context} />}
                </div>
                <Footer handleRandom={this.handleRandom} />
            </div>
        );
    }
}

export default App;

// not seeing difference between keyword and user searches, and deleting my browser data doesn't seem to affect it
// cannot solve double media
// "not found" message banner won't wait for tweets to be done loading. just disappears when there are no tweets to show after a search - I figure this indicates something in my component lifecycles needs to be reworked.
// hashtag replacement not 100% consistent
// can't get shadow boxes to show

// what should I put in README so the visitor knows to add .env file?

// to-do:
// heroku deployment - env file
// README
// dropdown for user/content selection