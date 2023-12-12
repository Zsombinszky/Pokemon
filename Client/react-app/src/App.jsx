import Location from "./components/Location";
import { useEffect } from "react";
import { useState } from "react";
import EnemyPokemon from "./components/EnemyPokemon";
import PlayerTeam from "./components/PlayerTeam";
import Encounter from "./components/Encounter";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [playerPokemonStats, setPlayerPokemonStats] = useState([]);
  const [selectedPlayerPokemon, setSelectedPlayerPokemon] = useState(false);

  const usersPokemon = [
    "https://pokeapi.co/api/v2/pokemon/mew",
    "https://pokeapi.co/api/v2/pokemon/lugia",
    "https://pokeapi.co/api/v2/pokemon/scyther"
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/location");
        const jsonData = await response.json();
        setData(jsonData.results);

        const fetchPromises = usersPokemon.map(async (pokemonUrl) => {
          const response1 = await fetch(pokemonUrl);
          return response1.json();
        });

        const pokemonStats = await Promise.all(fetchPromises);
        setPlayerPokemonStats(pokemonStats);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);



  const handleLocationClick = async (locationKey) => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/location/${locationKey}/`
      );
      const locationData = await response.json();
      const areas = locationData.areas;
      const randomArea = areas[Math.floor(Math.random() * areas.length)];
      const areaResponse = await fetch(randomArea.url);
      const areaData = await areaResponse.json();
      const pokemons = areaData["pokemon_encounters"];
      const randomPokemon =
        pokemons[Math.floor(Math.random() * pokemons.length)].pokemon;
      const pokemonResponse = await fetch(randomPokemon.url);
      const pokemonData = await pokemonResponse.json();
      setSelectedLocation(pokemonData);
    } catch (error) {
      console.error("Error fetching location data:", error);
    }
  };

  const handleBackClick = () => {
    setSelectedLocation(null);
  };


  function handleSelectPokemon(pokemon) {

    console.log(pokemon)
    setSelectedPlayerPokemon(pokemon)
   

  }


  return (
    <div className="App">
      
      <h1>{selectedLocation ? "" : "Locations"}</h1>
      
      {selectedLocation ? (
        <>
          <div>
            <EnemyPokemon
              key={1}
              name={selectedLocation.name}
              img={selectedLocation.sprites.front_default}
              hp={selectedLocation.stats[0].base_stat}
              attack={selectedLocation.stats[1].base_stat}
              def={selectedLocation.stats[2].base_stat}
            />
            <button onClick={handleBackClick}>Back</button>
            {/* {<h2>{selectedLocation.name}</h2>} */}
            {/* <pre>{JSON.stringify(selectedLocation, null, 2)}</pre> */}
          </div>
          <div className="mypokemon">
            {playerPokemonStats.map((pokemon, index) => (
              <PlayerTeam
                key={index + 1}
                name={pokemon.name}
                img={pokemon.sprites.front_default}
                hp={pokemon.stats[0].base_stat}
                attack={pokemon.stats[1].base_stat}
                def={pokemon.stats[2].base_stat}
                handleSelectPokemon={() => handleSelectPokemon(pokemon)}
              />
            ))}
          </div>
      
        </>


      ) : (
        <ul>
          {data.map((location, index) => (
            <Location
              key={index + 1}
              name={location.name}
              onClick={() => handleLocationClick(index + 1)}
            />
          ))}
        </ul>
      )}
      
    </div>
  );
}

export default App;
