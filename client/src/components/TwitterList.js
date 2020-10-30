import React from 'react';
import TwitterCard from "./TwitterCard"
import '../css/TwitterList.css'

function TwitterList(props) {

    const tweetArray = props.tweets[0];
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