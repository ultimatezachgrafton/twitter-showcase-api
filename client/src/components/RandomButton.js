import React from 'react';

function RandomButton(props) {

    return (
        <button id="random-btn" className="btn btn-dark" onClick={props.handleRandom}>Find a Random Tweet</button>
    )
}

export default RandomButton;