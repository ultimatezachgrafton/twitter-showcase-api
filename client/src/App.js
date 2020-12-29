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
            .then((res) => {
                const statuses = res.data;
                this.setState({
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
            .then((res) => {
                const statuses = res.data.statuses;
                this.setState({
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