"use client";

import React from "react";
import PokemonCards from "./components/PokemonCard";
import MainBtn from "../components/MainBtn";

export default function CardPage() {
  
  return (
    <div className="w-full flex-col items-center justify-center h-full">
      <MainBtn text="뒤로가기" url="/" />
      <PokemonCards />
    </div>
  );
}
