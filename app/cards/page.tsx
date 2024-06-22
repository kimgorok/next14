"use client";

import { useRouter } from "next/navigation";
import React from "react";
import PokemonCards from "./components/PokemonCard";

export default function CardPage() {
  const router = useRouter();

  return (
    <div className="w-full flex-col items-center justify-center h-full">
      <button
        onClick={() => {
          router.back();
        }}
      >
        뒤로가기
      </button>
      <PokemonCards />
    </div>
  );
}
