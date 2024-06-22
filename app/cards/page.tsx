"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

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

export default function CardPage() {
  const router = useRouter();
  const [pokemons, setPokemons] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const basicPokemons = await getPokemons();

      // 포켓몬 목록 섞기
      basicPokemons.sort(() => Math.random() - 0.5);

      // 섞인 목록에서 6마리만 선택
      const selectedPokemons = basicPokemons.slice(0, 6);

      // 선택된 포켓몬 목록을 2배로 늘리기 (각 포켓몬을 2번씩 추가)
      const duplicatedPokemons = [...selectedPokemons, ...selectedPokemons];

      const detailedPokemons = await Promise.all(
        duplicatedPokemons.map(async (pokemon) => {
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

  const handleCardClick = (index) => {
    if (
      flippedCards.length < 2 &&
      !flippedCards.includes(index) &&
      !matchedCards.includes(index)
    ) {
      setFlippedCards((prev) => [...prev, index]);
    }
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstIndex, secondIndex] = flippedCards;
      if (pokemons[firstIndex].name === pokemons[secondIndex].name) {
        setMatchedCards((prev) => [...prev, firstIndex, secondIndex]);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [flippedCards, pokemons]);

  return (
    <div className="w-full flex-col items-center justify-center h-full">
      <button
        onClick={() => {
          router.back();
        }}
      >
        뒤로가기
      </button>
      <div className="grid grid-cols-3 gap-4">
        {pokemons.map((pokemon, index) => (
          <div
            key={index}
            className="relative"
            onClick={() => handleCardClick(index)}
          >
            <div
              className={`w-32 h-32 transform ${
                flippedCards.includes(index) || matchedCards.includes(index)
                  ? "rotate-y-0"
                  : "rotate-y-180"
              } transition-transform duration-500`}
            >
              <img
                src={
                  flippedCards.includes(index) || matchedCards.includes(index)
                    ? pokemon.image
                    : "/back.png"
                }
                className="w-full h-full"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
