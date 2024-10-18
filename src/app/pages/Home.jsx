"use client";

import { useState, useEffect } from "react";
import PokemonCard from "../components/PokemonCard/PokemonCard";
import SearchBar from "../components/Shared/SearchBar/SearchPokemon";
import FilterBar from "../components/Shared/FilterBar/FilterPokemon";

const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [types, setTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const [pokemonRes, typesRes] = await Promise.all([
        fetch("https://pokeapi.co/api/v2/pokemon").then((res) => res.json()),
        fetch("https://pokeapi.co/api/v2/type").then((res) => res.json()),
      ]);

      setPokemons(pokemonRes.results);
      setFilteredPokemons(pokemonRes.results);
      setTypes(typesRes.results.map((type) => type.name));
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

  const filterPokemons = (term, type) => {
    const filtered = pokemons.filter((pokemon) => {
      const matchesName = pokemon.name.toLowerCase().includes(term.toLowerCase());
      const matchesType = type ? pokemon.type === type : true;
      return matchesName && matchesType;
    });

    setFilteredPokemons(filtered);
  };

  return (
    <div className="p-8">
      <div className="mb-6 flex flex-col gap-4">
        <SearchBar onSearch={handleSearch} />
        <FilterBar types={types} onFilter={handleFilter} />
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
