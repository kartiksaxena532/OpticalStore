"use client";
import Link from "next/link";
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
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
      <div className="flex flex-row md:pt-10 gap-5 md:space-y-0 space-x-0 md:space-x-4">
      
        <button className="md:w-60 md:h-16 w-40 h-14 rounded-xl bg-none border border-white border-transparent text-white text-sm md:text-lg">
        <LoginLink>
          Login
          </LoginLink>
        </button>
        <button className="md:w-60 md:h-16 w-40 h-14 rounded-xl bg-blue-500 text-white border border-black text-sm md:text-lg">

         <RegisterLink>Sign up</RegisterLink>
        </button>
      
      </div>
    </div>
  );
}
