"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const path = usePathname();
  return (
    <nav className="bg-[#2d2d2d] fixed w-[30%] top-5 rounded-[50px] py-5 left-1/2 z-10 -translate-x-1/2">
      <ul className="flex justify-center gap-[50px]">
        <li className="list-none transform-none transition ease-in-out duration-100 hover:scale-105">
          <Link href="/">Home</Link> {path === "/" ? "🔥" : ""}
        </li>
        <li className="list-none transform-none transition ease-in-out duration-100 hover:scale-105">
          <Link href="/about-us">About Us</Link>
          {path === "/about-us" ? "🔥" : ""}
        </li>
      </ul>
    </nav>
  );
}
