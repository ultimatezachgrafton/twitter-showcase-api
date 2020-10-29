import React, { Component } from "react";
import TwitterList from "./components/TwitterList";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'

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
                    tweets: [ statuses ]
                });
                console.log(this.state.tweets)
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
        console.log(random, randomPossibilities[random]);

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
                    tweets: [ statuses ]
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
                <NavBar className="topnav" handleSubmit={this.handleSubmit}/>
                <div className="div-list">
                    { this.state.tweets.length > 0 ? <TwitterList tweets={this.state.tweets}/> : null }
                </div>
                <Footer handleRandom={this.handleRandom}/> 
            </div>
        );
    }
}

export default App;

// css: twitter bird logo for decoration and on search bar
// css: twitter logo font
// add working links to tweets
// put handlefunctions and styles in their own files
// if (url) {
// find url in text and wrap linkify code around it
// }