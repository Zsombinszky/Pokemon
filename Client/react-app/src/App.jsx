import Location from "./components/Location";
import { useEffect } from "react";
import { useState } from "react";
import EnemyPokemon from "./components/EnemyPokemon";
import PlayerTeam from "./components/PlayerTeam";
import Encounter from "./components/Encounter";
import Buttons from "./components/Buttons";
import ButtonAnnouncer from "./components/ButtonAnnouncer";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [playerPokemonStats, setPlayerPokemonStats] = useState([]);
  const [selectedPlayerPokemon, setSelectedPlayerPokemon] = useState(false);
  const [isPokemonSelected, setIsPokemonSelected] = useState(false);

  const usersPokemon = [
    "https://pokeapi.co/api/v2/pokemon/mew",
    "https://pokeapi.co/api/v2/pokemon/lugia",
    "https://pokeapi.co/api/v2/pokemon/scyther",
  ];

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

const handleFlee = () => {
  setSelectedLocation(null);
  setIsPokemonSelected(false);
}

  const handleAttack = () => {
    
  };

  const handleBackClick = () => {
    setSelectedLocation(null);
  };

  function handleSelectPokemon(pokemon) {
    setSelectedPlayerPokemon(pokemon);
    setIsPokemonSelected(true);
  }

  return (
    <div className="App">
      <h1>{selectedLocation ? "" : "Locations"}</h1>
      {selectedLocation ? (
        isPokemonSelected ? (
          <>
            <Encounter
              key={1}
              enemyname={selectedLocation.name}
              enemyimg={selectedLocation.sprites.front_default}
              enemyhp={selectedLocation.stats[0].base_stat}
              enemyattack={selectedLocation.stats[1].base_stat}
              enemydef={selectedLocation.stats[2].base_stat}
              name={selectedPlayerPokemon.name}
              img={selectedPlayerPokemon.sprites.back_default}
              hp={selectedPlayerPokemon.stats[0].base_stat}
              attack={selectedPlayerPokemon.stats[1].base_stat}
              def={selectedPlayerPokemon.stats[2].base_stat}
            />
            <Buttons 
            handleFlee={handleFlee}
            />
          </>
        ) : (
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
        )
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
