'use client'
import { Progress } from "@nextui-org/react";
import Image from "next/image";

export default function Loading () {
  return (
    <div className="w-screen h-screen flex items-center justify-center overflow-x-hidden overflow-y-hidden">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <Image priority={true} unoptimized src={"/assets/images/neadle-thread.png"} width={100} height={100} alt="" />
        <Progress aria-label="Loading..." value={100} classNames={{indicator: "bg-white"}} className="w-[310px] max-w-[350px] mt-5 color-white white"/>
        <p className="text-caption text-xs mt-5">Tailor-Made Loading for Mikhwar&apos;s Finest.</p>
      </div>
    </div>
  )
}

