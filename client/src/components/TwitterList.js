import React from 'react';
import TwitterCard from "./TwitterCard"
import '../css/TwitterList.css'

function TwitterList(props) {

    const tweetArray = props.tweets[0];
    const displayTweet = tweetArray.map((tweet) => ( <TwitterCard tweet={ tweet } key={ tweet.id } /> 
        ));
    const notFound = "I couldn't find anything. Try again!"

    return (
        <div>
            { tweetArray < 1 ? displayTweet : notFound }
        </div>
    )
}

export default TwitterList;