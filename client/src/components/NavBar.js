import React from "react"
import SearchBar from "./SearchBar"
import "../css/NavBar.css"

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleData = this.handleData.bind(this);
    }

    handleData = (inputValue, searchType) => {
        this.props.handleSubmit(inputValue, searchType);
    }

    render() {
        return (
            <nav className="navbar navbar-light justify-content-between" id="navbar">

                <a className="navbar-brand" href="/">re:tweets</a>
                <span className="search-random">
                    <SearchBar
                        handleData={this.handleData}
                        class="form-inline" />
                </span>
            </nav>
        )
    }
}

export default NavBar;