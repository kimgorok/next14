"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import MainBtn from "../components/MainBtn";

export default function DetailPage() {
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
    <>
      <MainBtn text="처음으로" url="/" />
      <div className="flex flex-col items-center">
        <div className="absolute top-3 w-full flex justify-center font-extrabold text-3xl text-gray-700">
          출현한 포켓몬!
        </div>
        <div className="grid grid-cols-3 gap-4 pt-4">
          {pokemons.map((pokemon, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-4 max-w-80 h-auto bg-red-400 border-8 border-zinc-600 rounded-2xl"
            >
              <img
                src={pokemon.image}
                className="w-48 h-48 bg-white border-8 border-zinc-600 rounded-2xl"
              />
              <p className="pt-8 pb-4 font-bold text-3xl">{pokemon.name}</p>
              <p className="font-semibold">{pokemon.description}</p>
              <div className="flex gap-4 pt-2">
                <p>키: {pokemon.height} m</p>
                <p>몸무게: {pokemon.weight} kg</p>
              </div>
              <p>타입: {pokemon.types}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
