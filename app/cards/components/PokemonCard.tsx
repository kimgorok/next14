import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const API_URL = "https://pokeapi.co/api/v2/pokemon?limit=151";

// 포켓몬 정보 가져오기
async function getPokemons() {
  const response = await fetch(API_URL);
  const json = await response.json();
  return json.results;
}

// 포켓몬 세부 정보 가져오기
async function getPokemonDetails(url) {
  const response = await fetch(url);
  const json = await response.json();
  const speciesResponse = await fetch(json.species.url);
  const speciesJson = await speciesResponse.json();

  // 한국어 이름과 설명 가져오기
  const koreanName = speciesJson.names.find(
    (name) => name.language.name === "ko"
  );
  const koreanDescription = speciesJson.flavor_text_entries.find(
    (entry) => entry.language.name === "ko"
  );

  // 한국어 타입과 특성 가져오기
  const koreanTypes = await Promise.all(
    json.types.map(async (typeInfo) => {
      const typeResponse = await fetch(typeInfo.type.url);
      const typeJson = await typeResponse.json();
      const koreanType = typeJson.names.find(
        (name) => name.language.name === "ko"
      );
      return koreanType ? koreanType.name : typeInfo.type.name;
    })
  );

  return {
    name: koreanName ? koreanName.name : json.name,
    image: json.sprites.front_default,
    weight: json.weight,
    height: json.height,
    types: koreanTypes.join(", "),
    description: koreanDescription
      ? koreanDescription.flavor_text
      : "정보 없음",
  };
}

const PokemonCards = () => {
  const [pokemons, setPokemons] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPokemons, setSelectedPokemons] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const basicPokemons = await getPokemons();

      // 포켓몬 목록 섞기
      basicPokemons.sort(() => Math.random() - 0.5);

      // 섞인 목록에서 6마리만 선택
      const selectedPokemons = basicPokemons.slice(0, 6);

      // 선택된 포켓몬 목록을 2배로 늘리기 (각 포켓몬을 2번씩 추가)
      let duplicatedPokemons = [...selectedPokemons, ...selectedPokemons];

      // 배열을 무작위로 섞기
      duplicatedPokemons.sort(() => Math.random() - 0.5);

      const detailedPokemons = await Promise.all(
        duplicatedPokemons.map(async (pokemon) => {
          const details = await getPokemonDetails(pokemon.url);
          return details;
        })
      );

      // 중복 제거를 위해 Set 사용
      const uniquePokemons = Array.from(
        new Set(detailedPokemons.map((pokemon) => pokemon.name))
      ).map((name) =>
        detailedPokemons.find((pokemon) => pokemon.name === name)
      );

      setPokemons(detailedPokemons);
      setSelectedPokemons(uniquePokemons.slice(0, 6)); // 중복 없는 6개의 포켓몬 저장
      setIsLoading(false); // 데이터 로드 완료 후 로딩 상태 업데이트
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

  if (isLoading) {
    return <h2>게임 로딩중...</h2>;
  }

  const handleNextClick = () => {
    const queryParams = selectedPokemons
      .map(
        (pokemon, index) =>
          `pokemon${index + 1}Name=${pokemon.name}&pokemon${index + 1}Image=${
            pokemon.image
          }&pokemon${index + 1}Weight=${pokemon.weight}&pokemon${
            index + 1
          }Height=${pokemon.height}&pokemon${index + 1}Types=${
            pokemon.types
          }&pokemon${index + 1}Abilities=${pokemon.abilities}&pokemon${
            index + 1
          }Description=${pokemon.description}`
      )
      .join("&");
    router.push(`/detail?${queryParams}`);
  };

  return (
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
            {pokemon.name}
          </div>
        </div>
      ))}
      {matchedCards.length === pokemons.length && (
        <button
          onClick={handleNextClick}
          className="mt-4 p-2 bg-blue-500 text-white rounded"
        >
          다음
        </button>
      )}
    </div>
  );
};

export default PokemonCards;
