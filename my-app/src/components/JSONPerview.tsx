"use client";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export default function JSONPreview() {
  const items = useSelector((state: RootState) => state.editor.items);

  return (
    <div className="w-1/3 bg-gray-900 text-white p-4 font-mono text-sm overflow-auto">
      <pre>{JSON.stringify(items, null, 2)}</pre>
    </div>
  );
}
