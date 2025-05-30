"use client";
import Link from "next/link";
import { TypewriterEffectSmooth } from "./new/typewriter";

export default function Typewriter() {
  const words = [
    {
      text: "Let's",
      className: " text-2xl md:text-7xl text-neutral-500",
    },
    {
      text: "Make",
      className: "text-2xl md:text-7xl text-neutral-500",
    },
    {
      text: "Your",
      className: "text-2xl md:text-7xl text-neutral-500",
    },
    {
      text: "Vision",
      className: "text-2xl md:text-7xl text-neutral-500",
    },
    {
      text: "Outstanding!",
      className: "text-2xl md:text-7xl text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[35rem]  ">
      <p className="text-neutral-200 md:text-4xl  ">
        Enter The World of EyeCare
      </p>
      <TypewriterEffectSmooth words={words} />

      <div className="w-full h-fit rounded-lg bg-none">
        
        </div>
      <div className="flex flex-row md:pt-10 gap-5 md:space-y-0 space-x-0 md:space-x-4">
      <Link href='/dashboard'>
        <button className="md:w-60 md:h-16 w-40 h-14 rounded-xl bg-none border border-white border-transparent text-white text-sm md:text-lg">
       Get Started
        </button>
        </Link>
      
      </div>
    </div>
  );
}
