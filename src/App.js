import "./App.css";

import LoadingPokeball from './images/PokeballLoading.webp'; 

import React, { useEffect, useState } from "react";
import { Pokedex } from "pokeapi-js-wrapper";

import PokemonFlashCard from "./modules/PokemonFlashCard/PokemonFlashCard";
import PokemonDetailCard from "./modules/PokemonDetailCard/PokemonDetailCard";
import PokeStats from "./modules/PokeStats/PokeStats";
import Footer from "./modules/Footer/Footer"
import Header from "./modules/Header/Header"

const LOADING = (props) => <img src={LoadingPokeball} alt="Loading..." width="128px" height="128px" />;

const aPokedex = new Pokedex({
  protocol: "https",
  cache: true,
  timeout: 5 * 1000, // 5s
});

function App() {
  // HOOKS

  const [loadingStats, setLoadingStats] = useState(true);
  const [pkmnStatsCount, setPkmnStatsCount] = useState([]);
  const [pkmnStatsShowcase, setPkmnStatsShowcase] = useState([]);
  useEffect(() => {
    fetchStats()
      .then((pkmnStats) => {
        // Save states
        setPkmnStatsCount(pkmnStats.count);
        setPkmnStatsShowcase(pkmnStats.results);
      })
      // Lower flag
      .then(() => setLoadingStats(false));
  }, []);

  const [aRandomPkmnId, setRandomHighlightID] = useState(0);
  useEffect(() => {
    // Select a random pokemon to highlight out of fetched total
    let randPkmn = Math.min(Math.ceil(Math.random() * pkmnStatsCount), 807);
    console.log("Random Pkmn Selected: " + randPkmn);
    setRandomHighlightID(randPkmn); // Newest pokemon are not on the DB yet
  }, [pkmnStatsCount]);

  const [loadingHighlight, setLoadingHighlight] = useState(true);
  const [pkmnToHighlight, setPkmnHighlight] = useState();
  useEffect(() => {
    // Fetch pokemon data for a random Pokemon ID
    try {
      fetchPkmn(aRandomPkmnId)
        .then((aPkmn) => {
          // Set state
          setPkmnHighlight(aPkmn);
        })
        // Lower flag
        .then(() => setLoadingHighlight(false));
    } catch (error) {
      throw new Error(error);
    }
  }, [aRandomPkmnId]);

  const [loadingPkmnData, setLoadingPkmnData] = useState(true);
  const [pkmnData, setPokemonData] = useState([]);
  useEffect(() => {
    console.log("LOADING Pokemon Data: " + pkmnStatsCount);
    console.log(pkmnStatsShowcase);

    // Fetch every thumbnail from the returned list
    pkmnStatsShowcase.map(async (eachResult) => {
      // Fetch individual thumbnails
      await fetchPkmn(eachResult.name)
        .then((eachPokemon) =>
          // Consolidate all the fetched information into a single array
          ({
            id: eachPokemon.id,
            name: eachPokemon.name,
            sprite: eachPokemon.sprites.front_default,
          })
        )
        .then((aPkmnData) =>
          // Set state
          {
            setPokemonData((data) => {
              // console.log("Prev data: " + (data ? data.length : ""));
              // console.log(data);
              // console.log("To string: " + data.map((item) => item.name));
              return data.concat(aPkmnData);
            });
          }
        )
        .then(() =>
          // Lower flag
          setLoadingPkmnData(false)
        );
    });

    // console.log("DATA READY:");
    // console.log(strippedPokemonData);
  }, [pkmnStatsShowcase, pkmnStatsCount]);

  // ASYNC HELPER FUNCTIONS

  async function fetchStats() {
    return await aPokedex.getPokemonsList({
      limit: 25,
      offset: 8,
    });
  }
  async function fetchPkmn(pkmnId) {
    return await aPokedex.resource(`/api/v2/pokemon/${pkmnId}`);
  }

  // RENDERING

  return (
    <div className='App'>
      <Header />
      <div className='InfoContainer'>
        {/* {console.log("------")}
        {console.log("Loading stats? " + loadingStats)}
        {console.log("Stats: " + pkmnStatsCount)} */}
        {loadingStats ? <LOADING /> : <PokeStats count={pkmnStatsCount} />}

        {/* {console.log("Loading highlight? " + loadingHighlight)}
        {console.log("Highlight Pkm: " + pkmnToHighlight)} */}
        <div className="Feature">
          <span className="Title">
          <h3>Who's that</h3><h2>Pokémon?!</h2>
          </span>
          {loadingHighlight ? <LOADING /> : <PokemonDetailCard pkmnId={pkmnToHighlight.id} name={pkmnToHighlight.name} thumbUrl={pkmnToHighlight?.sprites.front_default} />}
        </div>
      </div>
      <div className='FlashCardContainer'>
        {/* {console.log("Loading pkmn data? " + loadingPkmnData)}
        {console.log("Data length: " + pkmnData.length)}
        {console.log("---//---")} */}
        {loadingPkmnData ? <LOADING /> : pkmnData.length === 0 ? <LOADING /> : pkmnData.map((aPkmn) => (aPkmn ? <PokemonFlashCard name={aPkmn.name} thumbUrl={aPkmn.sprite} key={aPkmn.name} /> : <p>No flash card loaded</p>))}
      </div>
      <Footer />
    </div>
  );
}

export default App;
