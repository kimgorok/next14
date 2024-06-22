"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function DetailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const pokemonDetails = [];
    for (let i = 1; i <= 6; i++) {
      const name = searchParams.get(`pokemon${i}Name`);
      const image = searchParams.get(`pokemon${i}Image`);
      const weight = searchParams.get(`pokemon${i}Weight`);
      const height = searchParams.get(`pokemon${i}Height`);
      const types = searchParams.get(`pokemon${i}Types`);
      const abilities = searchParams.get(`pokemon${i}Abilities`);
      if (name && image && weight && height && types && abilities) {
        pokemonDetails.push({ name, image, weight, height, types, abilities });
      }
    }
    setPokemons(pokemonDetails);
  }, [searchParams]);

  return (
    <div>
      <button
        onClick={() => {
          router.push("/");
        }}
      >
        처음으로
      </button>
      <div className="flex flex-col items-center">
        {pokemons.map((pokemon, index) => (
          <div key={index} className="p-4 ">
            <img src={pokemon.image} className="w-16 h-16" />
            <h3>{pokemon.name}</h3>
            <p>Weight: {pokemon.weight}</p>
            <p>Height: {pokemon.height}</p>
            <p>Types: {pokemon.types}</p>
            <p>Abilities: {pokemon.abilities}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
