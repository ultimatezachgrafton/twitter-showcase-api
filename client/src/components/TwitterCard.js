import React from "react";
import "../css/TwitterCard.css";
import TimeParser from "../controllers/TimeParser.js";
import TextParser from "../controllers/TextParser.js";

function TwitterCard(props) {
    return (

        <div className="tweet-card-body">
            <div className="tweet-header">
                <span className="image">
                    <img className="tuser-profile-image" src={props.tweet.user.profile_image_url_https} alt="profile_picture" />
                </span>


                <span className="tuser-name">
                    {props.tweet.user.name}
                </span>
                <a href={`https://www.twitter.com/${props.tweet.user.screen_name}`} target='_blank' className="tuser-screen-name">
                    @{props.tweet.user.screen_name}
                </a>
                <span className="tweet-created-at">
                    <TimeParser key={props.tweet.id} created_at={props.tweet.created_at} />
                </span>
            </div>

            <div className="tweet-text-container">
                <div className="tweet-text">
                    <TextParser key={props.tweet.id} tweet={props.tweet} />
                </div>
            </div>
            <img alt={props.tweet.entities.media ? props.tweet.entities.media[0].media_url_https : null} 
                src={props.tweet.entities.media ? props.tweet.entities.media[0].media_url_https : null}/>
            <p />

            <div className="tweet-footer">
                <span className="tweet-fav-count">
                    <img src={require('../static/retweet-icon.png')} alt="favorites" height="15%" width="15%" className="icon-img" /> {props.tweet.favorite_count}
                </span>
                <span className="tweet-retweet-count">
                    <img src={require('../static/favorite-icon.jpg')} alt="retweets" height="15%" width="15%" className="icon-img" />{props.tweet.retweet_count}
                </span>
                <span className="original-tweet-link">
                    <a href={`https://twitter.com/${props.tweet.user.id}/status/${props.tweet.id_str}`} target="_blank">Original Tweet</a>
                </span>
            </div>
        </div>
    )
}

export default TwitterCard;