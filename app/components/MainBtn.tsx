"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { btnHoverAnimation } from "./btnMotion";

interface MainBtnProps {
  text: string;
  url: string;
}

const MainBtn = ({ text, url }: MainBtnProps) => {
  const router = useRouter();
  return (
    <motion.button
      onClick={() => {
        router.push(url);
      }}
      className="font-extrabold text-xl cursor-pointer p-4 bg-emerald-500 border-8 border-zinc-600 rounded-2xl"
      {...btnHoverAnimation}
    >
      {text}
    </motion.button>
  );
};

export default MainBtn;
