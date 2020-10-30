import React from "react";
import "../css/TwitterCard.css";
import TimeParser from "../controllers/TimeParser.js";
import TextParser from "../controllers/TextParser";
import favorite-icon from "./static/favorite-icon.png";
import retweet-icon from "./static/retweet-icon.png";

function TwitterCard(props) {
    return (
        
        <div className="tweet-card-body">
            <span className="image">
                <img className="tuser-profile-image" src={props.tweet.user.profile_image_url_https} alt="profile_picture"/>
            </span>
            
            <span className="tuser-name"> 
                {props.tweet.user.name} 
            </span>
            <a href={`https://www.twitter.com/${props.tweet.user.screen_name}`} target='_blank' className="tuser-screen-name">
                @{props.tweet.user.screen_name}
            </a>
            <span className="tweet-created-at">
                <TimeParser key={props.tweet.id} created_at={props.tweet.created_at}/>
            </span>

            <div className="tweet-text">
                <TextParser key={props.tweet.id} tweet={props.tweet}/>
            </div>

            <span> 
                {props.tweet.entities.media ? props.tweet.entities.media[0].media_url_https : null}
            </span>
            <p />
            
            <div className="tweet-footer">
                <span className="tweet-fav-count">
                    <img src={favorite-icon} alt="favorites" height="25%" width="25%" className="icon-img"/> {props.tweet.favorite_count}
                </span>
                <span className="tweet-retweet-count">
                    <img src={retweet-icon} alt="retweets" height="25%" width="25%" className="icon-img"/>{props.tweet.retweet_count}
                </span>
                <span className="tweet-fav-count">
                    <a href={`https://twitter.com/${props.tweet.user.id}/status/${props.tweet.id_str}`} target="_blank"> Original </a>
                </span>
            </div>
        </div>
    )
}

export default TwitterCard;