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
      const description = searchParams.get(`pokemon${i}Description`);
      if (name && image && weight && height && types && description) {
        pokemonDetails.push({
          name,
          image,
          weight: (parseFloat(weight) / 10).toFixed(1),
          height: (parseFloat(height) / 10).toFixed(1),
          types,
          description,
        });
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
            <p>{pokemon.description}</p>
            <p>키: {pokemon.height} m</p>
            <p>몸무게: {pokemon.weight} kg</p>
            <p>타입: {pokemon.types}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
