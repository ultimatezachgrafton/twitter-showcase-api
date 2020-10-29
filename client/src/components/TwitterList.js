import React from 'react';
import TwitterCard from "./TwitterCard"

function TwitterList(props) {
    for (let i = 0; i < props.tweets.length; i++) {
        console.log("in list: " + props.tweets[0]);
    }
    console.log("in list: " + props.tweets[0].length);

    const tweetArray = props.tweets.[0];
    console.log(tweetArray);

    const displayTweet = tweetArray.map((tweet) => ( <TwitterCard tweet={ tweet } key={ tweet.id } /> 
        ));

    return (
        <div>
            { displayTweet }
        </div>
    )
}

export default TwitterList;