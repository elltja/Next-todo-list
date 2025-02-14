import { signOutUser } from "@/lib/actions";
import { headers } from "next/headers";
import React from "react";

export default async function ProfileCard() {
  const headersList = await headers();
  const userHeader = headersList.get("Authenticated-User");
  const user = userHeader ? JSON.parse(userHeader) : null;
  return (
    <div className="bg-surface rounded-md h-fit p-5 flex flex-col gap-3 items-center">
      <img
        src={user.user_metadata.avatar_url}
        alt=""
        className="h-24 w-24 rounded-full"
      />
      <div>
        <h2 className="font-bold">{user.user_metadata.user_name}</h2>
        <p className="text-[#ccc] text-sm">{user.user_metadata.email}</p>
      </div>
      <button className="text-red-700" onClick={signOutUser}>
        Signout
      </button>
    </div>
  );
}
