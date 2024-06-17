import React from "react";

export const metadata = {
  title: "Home",
};
export const API_URL = "https://pokeapi.co/api/v2/pokemon?limit=151";

async function getPokemons() {
  const response = await fetch(API_URL);
  const json = await response.json();
  return json.results;
}

export default async function HomePage() {
  const pokemons = await getPokemons();
  console.log(pokemons);
  return (
    <div className="w-full flex-col items-center justify-center h-full">
      {pokemons.map((pokemons, index) => (
        <div key={index}>{pokemons.name}</div>
      ))}
    </div>
  );
}
