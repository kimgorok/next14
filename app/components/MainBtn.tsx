"use client";

import { useRouter } from "next/navigation";

export default function MainBtn() {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push("/cards");
      }}
      className="cursor-pointer p-4"
    >
      시작
    </div>
  );
}
