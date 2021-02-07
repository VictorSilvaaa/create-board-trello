import React from 'react';

import './style.css';

interface randomScreenProps {
  img: string;
  text: string;
}

const RandomScreen: React.FC<randomScreenProps> = (props) => {
  return (
    <div className="random-screen">
      <div className="container">
        <div id="sucess">
        <img src={props.img} width='200px' alt={props.text}></img>
        </div>
        <p>{props.text}</p>
       
      </div>
    </div>
  )
}

export default RandomScreen;