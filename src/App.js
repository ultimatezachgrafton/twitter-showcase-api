import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
// import TwitterCard from "./components/TwitterCard";
// import SearchBar from "./components/SearchBar";

class App extends Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            tweets: [],
        }

        this.loadTweets = this.loadTweets.bind(this);
        this.handleChange = this.handleChange.bind(this);
        // this.searchCharacter = this.searchCharacter.bind(this);
    }

    async componentDidMount() {
        this.setState({ loading: true });

        const response = await fetch("https://api.twitter.com/1.1/statuses/update.json");
        const data = await response.json();

        this.setState({
            loading: false,
            tweets: [...data.results],
        })
    }

    async loadTweets(pageNumber) {
        const response = await fetch('https://api.twitter.com/1.1/statuses/update.json');
        const data = await response.json();
        this.setState({
            characters: data,
        });
    }

    async searchCharacter(event) {
        event.preventDefault();
        let response = await fetch(`https://api.twitter.com/1.1/search/tweets.json`)
            .then(res => res.json());
        this.setState({
            characters: response.results,
        });
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    };

    render() {
        return (
            <div className="App">
                <div class="topnav">
                    <h1>re:Tweet</h1>
                    {/* <SearchBar
                        characterSearch={this.state.characterSearch}
                        searchCharacter={this.searchCharacter}
                        handleChange={this.handleChange} /> */}
                </div>
                <div class="twitter-card">
                    {this.state.tweets[0]};
                    {/* {(this.state.loading) ? "... loading ..." :
                        <TwitterCard
                            key={this.state.characters}
                            tweets={this.state.characters} 
                            />} */}
                </div>
            </div>
        );
    }
}

export default App