import React from 'react';
import TwitterCard from "./TwitterCard"

function TwitterList(props) {

    // props coming in undefined - look up parent to child prop communication
    console.log(props.tweets);
    return (
        <div>
            { props.length > 0 ? props.tweets.map((item, index) => (
                <TwitterCard key={index} item={item} / >)) : null }
        </div>
    )
}

export default TwitterList;