import Location from "./components/Location";
import { useEffect } from "react";
import { useState } from "react";
import EnemyPokemon from "./components/EnemyPokemon";
import PlayerTeam from "./components/PlayerTeam";
import Encounter from "./components/Encounter";
import Buttons from "./components/Buttons";
import Egg from "./components/Egg"
import ButtonAnnouncer from "./components/ButtonAnnouncer";
import "./App.css";
import HatchedPoke from "./components/HatchedPoke";

function App() {
  const [data, setData] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [playerPokemonStats, setPlayerPokemonStats] = useState([]);
  const [selectedPlayerPokemon, setSelectedPlayerPokemon] = useState(false);
  const [isPokemonSelected, setIsPokemonSelected] = useState(false);
  const [myHP, setMyHP] = useState(null);
  const [wildHP, setWildHP] = useState(null);
  const [isWildPokemon, setIsWildPokemon] = useState(false);
  const [egg, setEgg] = useState(null);
  const [isHatched, setIsHatched] = useState(false)
  const [ourTeam, setOurTeam] = useState([
    "https://pokeapi.co/api/v2/pokemon/reshiram",
    "https://pokeapi.co/api/v2/pokemon/victini",
    "https://pokeapi.co/api/v2/pokemon/samurott",
  ])

  const eggUrl = "https://pokeapi.co/api/v2/pokemon/cosmog"


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/location");
        const jsonData = await response.json();
        setData(jsonData.results);

        const fetchPromises = ourTeam.map(async (pokemonUrl) => {
          const response1 = await fetch(pokemonUrl);
          return response1.json();
        });
        const pokemonStats = await Promise.all(fetchPromises);
        setPlayerPokemonStats(pokemonStats);

        const eggResponse = await fetch(eggUrl)
        const jsonEgg = await eggResponse.json();
          hatchEgg(jsonEgg);

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
      if (areas.length <= 0) {
        setIsWildPokemon(true);
      } else {
        const randomArea = areas[Math.floor(Math.random() * areas.length)];
        const areaResponse = await fetch(randomArea.url);
        const areaData = await areaResponse.json();
        const pokemons = areaData["pokemon_encounters"];
        const randomPokemon =
          pokemons[Math.floor(Math.random() * pokemons.length)].pokemon;
        const pokemonResponse = await fetch(randomPokemon.url);
        const pokemonData = await pokemonResponse.json();
        setSelectedLocation(pokemonData);
        setWildHP(pokemonData.stats[0].base_stat)
      }
    } catch (error) {
      console.error("Error fetching location data:", error);
    }
  };

  const handleFlee = () => {
    setSelectedLocation(null);
    setIsPokemonSelected(false);
  }

  const handleAttack = () => {
    //((((2/5+2)*B*60/D)/50)+2)*Z/255 B attacker attack, D defending pokemon def
    const randomNumber = Math.floor(Math.random() * (255 - 217 + 1)) + 217;

    const myAttack = selectedPlayerPokemon.stats[1].base_stat;
    const wildDefense = selectedLocation.stats[2].base_stat;
    const wildHPLocal = wildHP;

    const myTurn = wildHPLocal - Math.abs(Math.floor(((((2 / 5 + 2) * myAttack * 60 / wildDefense) / 50) + 2) * randomNumber / 255));

    const wildAttack = selectedLocation.stats[1].base_stat;
    const myDefense = selectedPlayerPokemon.stats[2].base_stat;
    const myHPLocal = myHP;

    const wildTurn = myHPLocal - Math.abs(Math.floor(((((2 / 5 + 2) * wildAttack * 60 / myDefense) / 50) + 2) * randomNumber / 255));

    setMyHP(wildTurn)
    setWildHP(myTurn);
  };

  const handleBackClick = () => {
    setSelectedLocation(null);
  };

  function handleSelectPokemon(pokemon) {
    setSelectedPlayerPokemon(pokemon);
    setIsPokemonSelected(true);
    setMyHP(pokemon.stats[0].base_stat)
  }

  function handleHatchClick() {
    const newList = [...ourTeam, eggUrl]
    setOurTeam(newList)
    setIsHatched(true)
  }

  function hatchEgg(eggParam) {
    setEgg(eggParam)
  }

  function handleNoEggClick() {
    setIsWildPokemon(false)
    setIsHatched(false)
  }


  return (
    <div className="App">
      <h1>{selectedLocation ? "" : "Locations"}</h1>
      {
        isWildPokemon ? (
          isHatched ? (
            <HatchedPoke
              name={egg.name.toUpperCase()}
              img={egg.sprites.front_default}
              goBack={handleNoEggClick}
            />
          ) : (
            <Egg
              goAway={handleNoEggClick}
              hatch={handleHatchClick} />
          )
        ) : (
          selectedLocation ? (
            isPokemonSelected ? (
              <>
                <Encounter
                  key={1}
                  enemyname={selectedLocation.name.toUpperCase()}
                  enemyimg={selectedLocation.sprites.front_default}
                  enemyhp={wildHP}
                  enemyattack={selectedLocation.stats[1].base_stat}
                  enemydef={selectedLocation.stats[2].base_stat}
                  name={selectedPlayerPokemon.name.toUpperCase()}
                  img={selectedPlayerPokemon.sprites.back_default}
                  hp={myHP}
                  attack={selectedPlayerPokemon.stats[1].base_stat}
                  def={selectedPlayerPokemon.stats[2].base_stat}
                />
                <Buttons
                  handleFlee={handleFlee}
                  handleAttack={handleAttack}
                />
              </>
            ) : (
              <>
                <div>
                  <EnemyPokemon
                    key={1}
                    name={selectedLocation.name.toUpperCase()}
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
                      name={pokemon.name.toUpperCase()}
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
          )
        )
      }
    </div>
  );
}

export default App;

//Xmas code: 
