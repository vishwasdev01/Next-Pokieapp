"use client"; 
import Image from "next/image";
import Link from "next/link"; 

const PokemonCard = ({ pokemon }) => {
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="card border border-gray-300 rounded shadow flex flex-col items-center transition-shadow duration-300 hover:shadow-lg 
                    w-full max-w-xs mx-auto md:max-w-sm lg:max-w-md xl:max-w-lg"> 
      {pokemon.sprites && pokemon.sprites.front_default ? (
        <div className="w-36 h-36 bg-white flex items-center justify-center mb-2 
                        md:w-48 lg:w-60 xl:w-72"> 
          <Image
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            width={150}
            height={150}
            className="pokemon-image"
          />
        </div>
      ) : (
        <div className="w-36 h-36 bg-white flex items-center justify-center mb-2 
                        md:w-48 lg:w-60 xl:w-72">
          <span>No Image</span>
        </div>
      )}
      <div className="bg-[#fafafa] p-3 rounded w-full md:p-6 lg:p-8 xl:p-10">
        <h3 className="text-lg font-bold text-left mb-12 md:text-lg lg:text-xl xl:text-xl">
          {capitalizeFirstLetter(pokemon.name)}
        </h3>
        <Link href={`/pokemon/${pokemon.name}`} className="mt-10 text-blue-500">
          Details →
        </Link>
      </div>
    </div>
  );
};

export default PokemonCard;