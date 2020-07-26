import './PokeStats.css';

import React from "react";

function PokemonStats({ count }) {
  // console.log(count);

  return (
    <div className='PokedexStats'>
      <p>
        {count && count > 0 ? (
          <span>
            <h3>Did you know...?</h3>
            <br />
            There are currently <b>{count}</b> Pokémons in total. <i>Neat!</i> <br/><br/> However, only <b>807</b> are available for review.
          </span>
        ) : (
          <span><h3>Oh, no!</h3><br /> An error ocurred preventing us from retrieving the Pokedex statistics.</span>
        )}
      </p>
    </div>
  );
}

export default PokemonStats;
