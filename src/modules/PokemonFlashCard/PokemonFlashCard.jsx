import './PokemonFlashCard.css';

import React from "react";

const PokemonFlashCard = ({ name , thumbUrl} ) => {
  return (
    <div className='FlashCard'>
      <p>{name}</p>
      <img src={thumbUrl} alt=""></img>
    </div>
  );
};

export default PokemonFlashCard;
