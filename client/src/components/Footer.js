import React from "react"
import "../css/Footer.css"

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
                <div className="footer-big">
                    <span className="span-btn"><button className="btn btn-dark" onClick={this.handleRandom}>Roll the dice!</button></span>
                    <p className="p-footer-credit">Written and maintained by Zach Grafton - Full Stack Developer - Android Developer - Website | Github | LinkedIn </p>
                </div>
                <div className="footer-small">
                    <span className="span-btn"><button className="btn btn-dark" id="footer-btn" onClick={this.handleRandom}>Roll the dice!</button></span>
                    <p className="p-footer-credit">Written and maintained by Zach Grafton - Full Stack Developer - Android Developer - Website | Github | LinkedIn </p>
                </div>
            </div>
        )
    }
}

export default NavBar;