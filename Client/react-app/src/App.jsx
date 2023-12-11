import React from "react";
import Location from "./components/Location";
import { useEffect } from "react";
import { useState } from "react";
import EnemyPokemon from "./components/EnemyPokemon";

function App() {
  const [data, setData] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const playerPokemons = [
    
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/location");
        const jsonData = await response.json();
        setData(jsonData.results);
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

  return (
    <div className="App">
      <h1>{selectedLocation ? "" : "Locations"}</h1>
      {selectedLocation ? (
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
