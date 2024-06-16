import React from "react";
import { API_URL } from "../(home)/page";

export async function getMovie(id: string) {
  const response = await fetch(`${API_URL}/${id}`);
  return response.json();
}

export default async function MovieInfo({ id }: { id: string }) {
  const movie = await getMovie(id);
  return (
    <div className="grid grid-cols-[1fr_2fr] gap-[50px] w-[80%] mx-auto">
      <img
        src={movie.poster_path}
        alt={movie.title}
        className="rounded-[20px] max-w-[70%] place-self-center"
      />
      <div className="flex flex-col mt-[20px] gap-[20px]">
        <h1 className="text-white text-4xl font-semibold">{movie.title}</h1>
        <h3 className="text-white">🧡{movie.vote_average.toFixed(1)}</h3>
        <p className="text-white">{movie.overview}</p>
        <a href={movie.homepage} target={"_blank"}>
          Homepage &rarr;
        </a>
      </div>
    </div>
  );
}
