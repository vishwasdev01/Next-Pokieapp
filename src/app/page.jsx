"use client";

import { useState, useEffect } from "react";
import PokemonCard from "./components/PokemonCard/PokemonCard"; 
import SearchPokemon from "./components/Shared/SearchBar/SearchPokemon"; 
import FilterPokemon from "./components/Shared/FilterBar/FilterPokemon";

const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [types, setTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const pokemonRes = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100");
      const pokemonData = await pokemonRes.json();

      const pokemonDetails = await Promise.all(
        pokemonData.results.map(async (pokemon) => {
          const detailRes = await fetch(pokemon.url);
          return detailRes.json();
        })
      );

      setPokemons(pokemonDetails);
      setFilteredPokemons(pokemonDetails);
      const typeRes = await fetch("https://pokeapi.co/api/v2/type");
      const typeData = await typeRes.json();
      setTypes(typeData.results.map((type) => type.name));
    };

    fetchData();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    filterPokemons(term, selectedType);
  };

  const handleFilter = (type) => {
    setSelectedType(type);
    filterPokemons(searchTerm, type);
  };

  const matchesType = (pokemon, type) => {
    if (!type) return true; 
    return pokemon.types.some(pokemonType => pokemonType.type.name === type);
  };

  const filterPokemons = (term, type) => {
    const filtered = pokemons.filter((pokemon) => {
      const matchesName = pokemon.name.toLowerCase().includes(term.toLowerCase());
      const matchesTypeCondition = matchesType(pokemon, type);
      return matchesName && matchesTypeCondition;
    });

    console.log('Filtered Pokémon:', filtered); 
    setFilteredPokemons (filtered);
  };

  return (
    <div className="p-8">
      <div className="mb-6 flex flex-col gap-4">
        <SearchPokemon onSearch={handleSearch} />
        <FilterPokemon types={types} onFilter={handleFilter} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
        {filteredPokemons.map((pokemon) => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};

export default Home;