import React from "react";


function TwitterCard(props) {
    let tweets = [];
    console.log("p: " + props.tweets[0].text);
    // const uuidv4 = require("uuid/v4")

    for(let i = 0; i < props.tweets.length; i++){
        let tweet = props.tweets.text;
        tweets.push(tweet);// <key=uuidv4()> text = tweet.text
                            /* <td>{character.birth_year}</td>
                            <td>{character.height}</td>
                            <td>{character.mass}</td>
                            <td>{planet}</td>
                            <td>{race}</td> */
                        // );/>
    }

        // console.log("props.tweets.statuses: " + props.tweets.statuses);
        // props.tweets.statuses = "hi";
    return(
        
            { tweets }
        
    )
}

export default TwitterCard;