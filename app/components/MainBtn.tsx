"use client";

import { useRouter } from "next/navigation";

export default function MainBtn() {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push("/cards");
      }}
      className="cursor-pointer p-4 bg-emerald-500 border-8 rounded-2xl"
    >
      시작하기
    </div>
  );
}
