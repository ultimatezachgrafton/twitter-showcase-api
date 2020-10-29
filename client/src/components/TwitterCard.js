import React from "react";
import "./TwitterCard.css";
import TimeParser from "./TimeParser.js";

function TwitterCard(props) {
    console.log("in card: " + props.tweet);
    return (
        
        <div className="tweet-card-body">
            <span className="image"><img className="tuser-profile-image" src={props.tweet.user.profile_image_url_https} alt="profile_picture"></img></span>
            
            <span className="tuser-name">{props.tweet.user.name}</span>
            <span className="tuser-screen-name">@{props.tweet.user.screen_name}</span>
            <span className="tweet-created-at"><TimeParser key={props.tweet.id} created_at={props.tweet.created_at}/></span>

            <div className="tweet-text">{props.tweet.full_text}</div>
            <span> {props.tweet.entities.media ? props.tweet.entities.media[0].media_url_https : null}</span>
            <p />
            
            <div className="tweet-footer">
                <span className="tweet-fav-count">Likes: {props.tweet.favorite_count}</span>
                <span className="tweet-retweet-count">Retweets:{props.tweet.retweet_count}</span>
            </div>
        </div>
    )
}

export default TwitterCard;