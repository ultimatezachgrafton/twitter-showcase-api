import React from "react";

function TwitterCard(props) {
    console.log("p: " + props.tweet.text );
    console.log("p: " + props.tweet.user.name );
    console.log("p: " + props.tweet.user.screen_name );

    return (
        <div>
            <span>{ props.tweet.user.profile_image_url_https }</span>
            <span>{ props.tweet.user.name }</span>
            <span>{ props.tweet.user.screen_name }</span>
            <span>{ props.tweet.created_at }</span>
            <span>{ props.tweet.full_text}</span>
            {/* <span> {props.entities.media ? props.entities.media[0].media_url_https : null }</span> */}
            <span>{ props.tweet.favorite_count }</span> <p/>
            <span>{ props.tweet.retweet_count }</span>

        </div>
    )
}

export default TwitterCard;