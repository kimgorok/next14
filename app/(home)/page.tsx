import React from "react";
import MainBtn from "../components/MainBtn";

export default function HomePage() {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <MainBtn text="시작하기" url="/cards" />
    </div>
  );
}
