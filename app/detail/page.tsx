"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function DetailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const pokemonNames = [];
    for (let i = 1; i <= 6; i++) {
      const name = searchParams.get(`pokemon${i}`);
      if (name) pokemonNames.push(name);
    }
    setPokemons(pokemonNames);
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
      <div className="">
        {pokemons.map((name, index) => (
          <div key={index} className="p-4 border border-gray-300 rounded">
            {name}
          </div>
        ))}
      </div>
    </div>
  );
}
