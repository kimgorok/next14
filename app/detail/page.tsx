"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { btnHoverAnimation } from "../components/btnMotion";

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
      <motion.button
        className=""
        {...btnHoverAnimation}
        onClick={() => {
          router.push("/");
        }}
      >
        처음으로
      </motion.button>
      <div className="grid grid-cols-3 gap-4">
        {pokemons.map((pokemon, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-4 max-w-80 h-auto border-2 border-slate-300 rounded-2xl"
          >
            <img src={pokemon.image} className="w-48 h-48" />
            <p className="font-bold text-3xl">{pokemon.name}</p>
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
