"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

interface IMovieProps {
  title: string;
  id: string;
  poster_path: string;
}




export default function Movie({ title, id, poster_path }: IMovieProps) {
  const router = useRouter();
  const onClick = () => {
    router.push(`/movies/${id}`);
  };
  return (
    <div className="grid grid-rows-[1fr_auto] gap-5 cursor-pointer place-items-center">
      <img
        className="max-w-full min-h-full rounded-[10px] transition-opacity duration-300 ease-in-out opacity-70 hover:opacity-100"
        src={poster_path}
        alt={title}
        onClick={onClick}
      />
      <Link className="text-center" href={`/movies/${id}`}>
        {title}
      </Link>
    </div>
  );
}
