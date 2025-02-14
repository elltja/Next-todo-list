import React from "react";

export default function TodoItem({
  text,
  id,
  isComplete,
  deleteFunction,
  toggleFunction,
}: {
  text: string;
  id: string;
  isComplete: boolean;
  deleteFunction: (id: string) => void;
  toggleFunction: (id: string, isComplete: boolean) => void;
}) {
  return (
    <div className="px-4 py-2 bg-elevated rounded-md flex justify-between">
      <div className="flex gap-3">
        <input
          className="cursor-pointer"
          type="checkbox"
          onChange={() => toggleFunction(id, !isComplete)}
          checked={isComplete}
        />
        <p>{text}</p>
      </div>
      <span className="cursor-pointer" onClick={() => deleteFunction(id)}>
        &times;
      </span>
    </div>
  );
}
