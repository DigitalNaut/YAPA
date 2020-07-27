import "./PokemonDetailCard.css";

import React from "react";

const PokemonDetailCard = ({ name, pkmnId, thumbUrl }) => {
  // console.log("thumbUrl");
  // console.log(thumbUrl);
  return (
    <div className='DetailCard'>
      <img src={thumbUrl} alt=''></img>
      <h2 className="InfoReveal">It's...</h2>
      <div className='InfoReveal'>
        <h1>{name}</h1>
        <p>#{pkmnId}</p>
      </div>
    </div>
  );
};

export default PokemonDetailCard;
