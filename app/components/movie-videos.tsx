import React from "react";
import { API_URL } from "../(home)/page";

async function getVideos(id: string) {
  const response = await fetch(`${API_URL}/${id}/videos`);
  return response.json();
}

export default async function MovieVideos({ id }: { id: string }) {
  const videos = await getVideos(id);
  return (
    <div className="w-[80%] mx-auto grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-[20px] mt-[100px] pb-[100px]">
      {/* {videos.map((video) => (
        <iframe
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          key={video.id}
          src={`https://youtube.com/embed/${video.key}`}
          title={video.name}
          className="rounded-[10px] opacity-80 transition-opacity duration-200 ease-in-out hover:opacity-100"
        />
      ))} */}
      ㅎㅇ
    </div>
  );
}
