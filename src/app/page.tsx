import ProfileCard from "@/components/ProfileCard";
import TodoBox from "@/components/TodoBox";
import React from "react";

export default function TodoPage() {
  return (
    <div className="w-screen h-screen flex flex-1 gap-3 justify-center">
      <TodoBox />
      <ProfileCard />
    </div>
  );
}
