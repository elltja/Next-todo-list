import assets from "@/assets/assets";
import { authenticateAction } from "@/lib/actions";
import Image from "next/image";
import React from "react";

export default function AuthPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <button
        className="flex items-center gap-2 p-2 rounded-sm border border-[#333333] m-5"
        onClick={authenticateAction}
      >
        <Image src={assets.github} alt="github-logo" className="w-10 h-10" />
        Continue with github
      </button>
    </div>
  );
}
