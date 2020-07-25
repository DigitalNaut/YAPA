import React from "react";

function PokemonStats({count}) {
  // console.log(count);


  return (
    <div className="PokedexStats">
      <p>
        { 
          count && count > 0 ?
           `The Pokedex contains ${count} Pokémons in total!`
          : "An error ocurred preventing us from retrieving the Pokedex statistics."
        }
        <br/>
        However, we know that 807 are available for review.
        </p>
    </div>
  );
};

export default PokemonStats;
