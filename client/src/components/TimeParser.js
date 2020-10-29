import React from 'react';

class TimeParser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: props.created_at,
            date_diff: ''
        }
    }

    componentDidMount() {
        console.log("hello from time parser");
        const created_at = new Date(this.state.date);
        const diff = (((new Date()).getTime() - created_at.getTime()) / 1000);
        const floor = Math.floor(diff / 86400);

        if ((floor >= 0) && (floor <= 60)) {
            this.setState({
                date_diff: "just now"
            })
        };

        if ((floor > 60) && (floor <= 120)) {
            this.setState({
                date_diff: "1 minute ago"
            })
        };

        if ((floor > 120) && (floor <= 3600)) {
            this.setState({
                date_diff: Math.floor(diff / 60) + " minutes ago"
            })
        };

        if ((floor > 120) && (floor <= 7200)) {
            this.setState({
                date_diff: "1 hours ago"
            })
        };

        if ((floor > 7200) && (floor <= 85400)) {
            this.setState({
                date_diff: Math.floor(diff / 3600) + " hours ago"
            })
        };

        if ((floor === 1)) {
            this.setState({
                date_diff: "Yesterday"
            })
        };

        if ((floor > 1) && (floor < 7)) {
            this.setState({
                date_diff: floor + " days ago"
            })
        };

        if ((floor === 7)) {
            this.setState({
                date_diff: "1 weeks ago"
            })
        }

        if ((floor > 7)) {
            this.setState({
                date_diff: Math.ceil(floor / 7) + " weeks ago"
            })
        };

        console.log("dd: " + this.state.date_diff);
    }


    render() {
        return (
            <span> { this.state.date_diff} </span>
        )
    }
}

export default TimeParser;