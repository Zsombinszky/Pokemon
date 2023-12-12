# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

{selectedPlayerPokemon ? (
        <Encounter
          key={1}
          enemyname={selectedLocation.name}
          enemyimg={selectedLocation.sprites.front_default}
          enemyhp={selectedLocation.stats[0].base_stat}
          enemyattack={selectedLocation.stats[1].base_stat}
          enemydef={selectedLocation.stats[2].base_stat}
          name={selectedPlayerPokemon.name}
          img={selectedPlayerPokemon.sprites.front_default}
          hp={selectedPlayerPokemon.stats[0].base_stat}
          attack={selectedPlayerPokemon.stats[1].base_stat}
          def={selectedPlayerPokemon.stats[2].base_stat}
        />

      ) : (<>
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
      </>)}