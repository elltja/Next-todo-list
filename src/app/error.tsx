"use client";

import React from "react";

export default function ErrorPage() {
  return (
    <div className="">
      <div className="">
        <h1>Oops, something went wrong</h1>
        <p>There was an issue and the page could not be loaded</p>
        <button onClick={() => window.location.reload()} className="">
          Reload page
        </button>
      </div>
    </div>
  );
}
