"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import { CircularProgress, Card, CardContent, CardMedia, Typography, Button } from '@mui/material';

const PokemonDetailPage = () => {
  const { slug } = useParams(); 
  const [pokemon, setPokemon] = useState(null);
  const router = useRouter(); 

  useEffect(() => {
    if (slug) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${slug}`)
        .then(res => res.json())
        .then(data => setPokemon(data))
        .catch(error => console.error('Error fetching Pokémon:', error));
    }
  }, [slug]);

  if (!pokemon) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-4">
        <Button onClick={() => router.push('/')} variant="text" startIcon={<span>&larr;</span>}>
          Back
        </Button>
        <Breadcrumb name={pokemon.name} />
      </div>

      <Card className="border rounded-lg flex flex-col items-center" style={{ maxWidth: 400, margin: '0 auto' }}>
        <CardMedia
          component="img"
          style={{ backgroundColor: '#60E2C9', height: '300px' }}
          image={pokemon.sprites.front_default}
          alt={pokemon.name}
        />
        <CardContent style={{ backgroundColor: '#FDC666' }}>
          <Typography variant="h6" component="div" align="left">
            <span style={{ fontWeight: 'bold' }}>Name:</span> {pokemon.name}
          </Typography>
          <Typography variant="h6" component="div" align="left">
            <span style={{ fontWeight: 'bold' }}>Types:</span> {pokemon.types.map((type) => type.type.name).join(', ')}
          </Typography>
          <Typography variant="h6" component="div" align="left">
            <span style={{ fontWeight: 'bold' }}>Abilities:</span> {pokemon.abilities.map((ability) => ability.ability.name).join(', ')}
          </Typography>
          <Typography variant="h6" component="div" align="left">
            <span style={{ fontWeight: 'bold' }}>Moves:</span> {pokemon.moves.slice(0, 5).map((move) => move.move.name).join(', ')}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default PokemonDetailPage;
