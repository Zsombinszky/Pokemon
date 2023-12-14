import React, { useEffect, useState, useRef } from "react";
import Location from "./components/Location";
import EnemyPokemon from "./components/EnemyPokemon";
import PlayerTeam from "./components/PlayerTeam";
import Encounter from "./components/Encounter";
import Buttons from "./components/Buttons";
import BattleAnnouncer from "./components/BattleAnnouncer";
import "./App.css";

const useTypedMessage = (message) => {
  const [typedMessage, setTypedMessage] = useState("");

  useEffect(() => {
    setTypedMessage("");

    if (message.length) {
      (async () => {
        let visibleMessage = "";
        for (let i = 0; i < message.length; i++) {
          await wait(50);
          visibleMessage = visibleMessage + message[i];
          setTypedMessage(visibleMessage);
        }
      })();
    }
  }, [message]);

  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  return typedMessage;
};

function App() {
  const [data, setData] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [playerPokemonStats, setPlayerPokemonStats] = useState([]);
  const [selectedPlayerPokemon, setSelectedPlayerPokemon] = useState(false);
  const [isPokemonSelected, setIsPokemonSelected] = useState(false);
  const [myHP, setMyHP] = useState(null);
  const [wildHP, setWildHP] = useState(null);
  const [announcerMessage, setAnnouncerMessage] = useState("");
  const [maxplayerpokemonhp, setmaxplayerpokemonhp] = useState(null);
  const [maxwildpokemonhp, setmaxwildpokemonhp] = useState(null);
  const playerPokePicRef = useRef(null);

  const [backgroundImages, setBackgroundImages] = useState([
    "url('/pictures/background1.jpg')",
    "url('/pictures/background2.jpg')",
    "url('/pictures/background3.jpg')",
    "url('/pictures/background4.jpg')",
    "url('/pictures/background5.jpg')",
    "url('/pictures/background6.jpg')",
    "url('/pictures/background7.jpg')",
  ]);
  const [selectedBackground, setSelectedBackground] = useState("");

  const usersPokemon = [
    "https://pokeapi.co/api/v2/pokemon/reshiram",
    "https://pokeapi.co/api/v2/pokemon/victini",
    "https://pokeapi.co/api/v2/pokemon/samurott",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data
        const response = await fetch("https://pokeapi.co/api/v2/location");
        const jsonData = await response.json();
        setData(jsonData.results);
  
        // Fetch Pokemon stats
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
      console.log(pokemonData);
      setWildHP(pokemonData.stats[0].base_stat);
      setmaxwildpokemonhp(pokemonData.stats[0].base_stat);
    } catch (error) {
      console.error("Error fetching location data:", error);
    }
  };

const menuBackground = () =>{
  document.body.style.background = "url('/pictures/menubackground.jpg')";
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundAttachment = 'fixed';
}

  const handleFlee = () => {
    setSelectedLocation(null);
    setIsPokemonSelected(false);
    menuBackground()
    setAnnouncerMessage("Please select a Location to encounter a random wild pokemon!");
  };
  
  const handleAttack = () => {
    //((((2/5+2)*B*60/D)/50)+2)*Z/255 B attacker attack, D defending pokemon def
    const randomNumber = Math.floor(Math.random() * (255 - 217 + 1)) + 217;
    
    const myAttack = selectedPlayerPokemon.stats[1].base_stat;
    const wildDefense = selectedLocation.stats[2].base_stat;
    const wildHPLocal = wildHP;
    
    const myTurn =
    wildHPLocal -
    Math.abs(
      Math.floor(
        ((((2 / 5 + 2) * myAttack * 60) / wildDefense / 50 + 2) *
        randomNumber) /
        255
        )
        );
        
    const wildAttack = selectedLocation.stats[1].base_stat;
    const myDefense = selectedPlayerPokemon.stats[2].base_stat;
    const myHPLocal = myHP;

    const wildTurn =
      myHPLocal -
      Math.abs(
        Math.floor(
          ((((2 / 5 + 2) * wildAttack * 60) / myDefense / 50 + 2) *
            randomNumber) /
            255
        )
      );
      setMyHP(wildTurn);
      setWildHP(myTurn);
  };

  const handleBackClick = () => {
    setSelectedLocation(null);
    menuBackground()
  };

  function handleSelectPokemon(pokemon) {
    setSelectedPlayerPokemon(pokemon);
    setIsPokemonSelected(true);
    setMyHP(pokemon.stats[0].base_stat);
    setmaxplayerpokemonhp(pokemon.stats[0].base_stat);

    const randomBackground =
      backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
    setSelectedBackground(randomBackground);
    console.log(randomBackground);
    setAnnouncerMessage(`Wild ${selectedLocation.name.toUpperCase()} appeared and the Battle Started!!!`);

setTimeout(() => {
  setAnnouncerMessage(`What will ${pokemon.name.toUpperCase()} do??`);
}, 3500);

    document.body.style.background = randomBackground ;
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundSize = 'cover';
  }

  return (
    <div className="App">
      <h1 className="locationtext">{selectedLocation ? "" : "Locations"}</h1>
      {selectedLocation ? (
        isPokemonSelected ? (
          <>
            <Encounter
              key={1}
              enemyname={selectedLocation.name}
              enemyimg={
                selectedLocation.sprites.versions["generation-v"]["black-white"]
                  .animated.front_default
              }
              enemyhp={wildHP}
              maxenemyhp={maxwildpokemonhp}
              enemyattack={selectedLocation.stats[1].base_stat}
              enemydef={selectedLocation.stats[2].base_stat}
              name={selectedPlayerPokemon.name}
              img={
                selectedPlayerPokemon.sprites.versions["generation-v"][
                  "black-white"
                ].animated.back_default
              }
              hp={myHP}
              maxplayerhp={maxplayerpokemonhp}
              attack={selectedPlayerPokemon.stats[1].base_stat}
              def={selectedPlayerPokemon.stats[2].base_stat}
            />
            <Buttons handleFlee={handleFlee} handleAttack={handleAttack} />
            <div>
              <BattleAnnouncer
                message={
                  announcerMessage ||
                  `What will ${selectedPlayerPokemon.name} do?`
                }
                context="encounter"
              />
            </div>
          </>
        ) : (
          <>
            <div className="pokemoncontainer">
              <EnemyPokemon
                key={1}
                name={selectedLocation.name}
                img={selectedLocation.sprites.versions["generation-v"]["black-white"]
                .animated.front_default}
                hp={selectedLocation.stats[0].base_stat}
                attack={selectedLocation.stats[1].base_stat}
                def={selectedLocation.stats[2].base_stat}
              />
              <button className="backbutton" onClick={handleBackClick}>Back</button>
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
          <BattleAnnouncer
                message={
                  announcerMessage ||
                  `Please select a Location to encounter a random wild pokemon!`
                }
                context="location"
              />
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
