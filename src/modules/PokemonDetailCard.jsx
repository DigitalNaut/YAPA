import React from "react";

const PokemonDetailCard = ({ name , pkmnId , thumbUrl }) => {
  // console.log("thumbUrl");
  // console.log(thumbUrl);
  return (
    <div className='DetailCard'>
      <h1>{name}</h1>
      <p>Id: {pkmnId}</p>
      <img src={thumbUrl} alt=''></img>
    </div>
  );
};

export default PokemonDetailCard;
