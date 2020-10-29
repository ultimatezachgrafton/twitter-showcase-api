import React from "react"
import "./Footer.css"

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleRandom = this.handleRandom.bind(this);
    }

    handleRandom = (event) => {
        this.props.handleRandom(event);
    }

    render() {
        return (
            <div className="footer">
                <span className="span-btn"><p className="p-footer">(Pssst. You feeling lucky?) </p><button className="btn btn-dark" onClick={this.handleRandom}>Roll the dice!</button></span>
                <p className="p-footer">Written and maintained by Zach Grafton - Full Stack Developer - Android Developer - Website | Github | LinkedIn </p>
            </div>
        )
    }
}

export default NavBar;