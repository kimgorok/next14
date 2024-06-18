"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        router.push("/cards");
      }}
    >
      시작
    </button>
  );
}
