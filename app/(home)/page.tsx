"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const API_URL = "https://pokeapi.co/api/v2/pokemon?limit=151";

// 순수 함수로 데이터 가져오기 함수 정의
async function getPokemons() {
  const response = await fetch(API_URL);
  const json = await response.json();
  return json.results;
}

// 각 포켓몬의 세부 정보 가져오기 함수 정의
async function getPokemonDetails(url) {
  const response = await fetch(url);
  const json = await response.json();
  return json;
}

export default function HomePage() {
  const [pokemons, setPokemons] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const basicPokemons = await getPokemons();
      const detailedPokemons = await Promise.all(
        basicPokemons.map(async (pokemon) => {
          const details = await getPokemonDetails(pokemon.url);
          return {
            name: details.name,
            image: details.sprites.front_default,
          };
        })
      );
      setPokemons(detailedPokemons);
    }
    fetchData();
  }, []);

  return (
    <div className="w-full flex-col items-center justify-center h-full">
      {pokemons.map((pokemon, index) => (
        <div key={index}>
          <img src={pokemon.image} alt={pokemon.name} />
          <p>{pokemon.name}</p>
        </div>
      ))}
      <button
        onClick={() => {
          router.push("/cards");
        }}
      >
        시작
      </button>
    </div>
  );
}
