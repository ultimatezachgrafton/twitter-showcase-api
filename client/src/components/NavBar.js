import React from "react"
import SearchBar from "./SearchBar"
import "./NavBar.css"

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleRandom = this.handleRandom.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
        this.setState({
            inputValue: event.target.value
        });
        console.log(this.state.inputValue);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.handleSubmit(this.state.inputValue);
    }

    handleRandom = (event) => {
        this.props.handleRandom(event);
    }

    render() {
        return (
            <nav className="navbar navbar-light justify-content-between" id="navbar">
                <img src="../static/twitter-bird-white-on-blue.png" alt="twitter-bird-white-on-blue" height="50px" width="50px"/>
                 <a className="navbar-brand" href="/">re:tweets</a>
            {/* <form class="form-inline"> */}
            <span className="search-random">
                <SearchBar
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    class="form-inline" />
                </span>
</nav>
        )
    }
}

export default NavBar;