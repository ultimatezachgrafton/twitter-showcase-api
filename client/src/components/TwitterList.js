import React from 'react';
import TwitterCard from "./TwitterCard"

function TwitterList(props) {

    for (let i = 0; i < props.tweets.length; i++) {
        console.log("iterate list :" + props.tweets[i].statuses[i].created_at);

        return (
            <ul>
                { <TwitterCard tweet={ props.tweets[i].statuses[i] }/> }
            </ul>
        )
    }
}

export default TwitterList;