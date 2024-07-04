"use client";

import React from "react";
import PokemonCards from "./components/PokemonCard";


export default function CardPage() {
  return (
    <div className="w-full flex-col items-center justify-center h-full">
      <PokemonCards />
    </div>
  );
}
