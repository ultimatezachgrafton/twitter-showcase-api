import React from 'react';
import '../css/MessageBanner.css'
import ReactHTMLParser from 'react-html-parser';

function MessageBanner(props) {

    let message;

    if (props.context === "welcome") {
        message = (`<p>Welcome to re:tweets!</p> <p>Try me out by searching for a tweet!</p>`)
    }

    if (props.context === "not found") {
        message = (`<p>I'm sorry, I couldn't find your tweet. We'll get it next time!</p>`)
    }
    
    if (props.context === "searching") {
        message = (`<p>Seaching!</p>`)
    }

    return (

        <div className="message-container">
            { ReactHTMLParser(message) }
        </div>

    );
}

export default MessageBanner;