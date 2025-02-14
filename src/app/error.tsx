"use client";

import React from "react";

export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <div className="flex flex-col items-center gap-2">
        <h1 className="font-bold text-xl text-center">
          Oops, something went wrong
        </h1>
        <p className="text-center">
          There was an issue and the page could not be loaded
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-primary p-3 rounded-md text-white text-center my-4"
        >
          Reload page
        </button>
      </div>
    </div>
  );
}
