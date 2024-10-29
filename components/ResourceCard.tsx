"use client"
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/new/card';
import { BackgroundGradient } from "@/components/background-gradient";
interface Props {
  id: string;
  title: string;
  image: string;
  downloadNumber: number;
  downloadLink: string;
}

const ResourceCard = ({ id, title, image, downloadNumber, downloadLink }: Props) => {
  return (
    <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-zinc-900">
    <Card className="w-full max-w-fit border-0 !bg-transparent sm:max-w-[356px]">
      <Link href={downloadLink} target="_blank">
        <CardHeader className="flex-center flex-col gap-2.5 !p-0">
          <div className="h-fit w-full">
            <Image 
              src={image}
              className="h-full rounded-md object-fill"
              width={384}
              height={440}
              alt={title}
            />
          </div>
          <CardTitle className="text-white paragraph-semibold w-full text-left">{title}</CardTitle>
        </CardHeader>
      </Link>
      <CardContent className="flex-between mt-4 p-0">
        <div className="flex-center body-medium gap-1.5 text-white">
          <Image 
            src="/graph-up-svgrepo-com.svg" width={20} height={20} alt="download" className="white"
          />
          {downloadNumber}
        </div>
        <Link href={downloadLink} target="_blank" className="flex-center text-gradient_purple-blue body-semibold gap-1.5">
          Buy Now
          <Image src="/arrow-blue.svg" width={13} height={10} alt="arrow" />
        </Link>
      </CardContent>
    </Card>
    </BackgroundGradient>
  )
}

export default ResourceCard