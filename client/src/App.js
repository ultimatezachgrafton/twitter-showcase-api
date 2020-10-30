import React, { Component } from "react";
import TwitterList from "./components/TwitterList";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/App.css';
import axios from 'axios';
import logo from './static/twitter-bird-white-on-blue.png';

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
    }

    handleSubmit = (inputValue) => {
        this.setState({
            loading: true
        })
        axios.get(`/api/search`, {
            params: {
                q: inputValue
            }
        })
            .then(async (res) => {
                const statuses = res.data.statuses;
                this.setState({
                    tweets: [statuses]
                });
                console.log(this.state.tweets);
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

    handleRandom = () => {
        // randomly select one
        const random = Math.floor(Math.random() * randomPossibilities.length);

        const randomChoice = randomPossibilities[random];
        this.setState({
            loading: true
        })
        axios.get(`/api/random`, {
            params: {
                q: randomChoice
            }
        })
            .then(async (res) => {
                const statuses = res.data.statuses;
                this.setState({
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
                    {this.state.tweets.length > 0 ? <TwitterList tweets={this.state.tweets} /> : 
                        <img src={logo} alt="twitter-bird-white-on-blue" height="25%" width="25%" className="background-img"/> }
                </div>
                <Footer handleRandom={this.handleRandom} />
            </div>
        );
    }
}

export default App;

// crashes on input of symbols
// wrap links if they too long
// cannot solve double media

// to-do:
// css for smaller screens
// splash page - "Welcome" message
// messages for 'searching' and 'couldn't find anything'