"use client";

import { useRouter } from "next/navigation";

export default function DetailPage() {
  const router = useRouter();

  return (
    <div>
      <button
        onClick={() => {
          router.push("/");
        }}
      >
        처음으로
      </button>
    </div>
  );
}
