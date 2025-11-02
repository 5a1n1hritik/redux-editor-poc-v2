"use client";

import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export default function JSONPreview() {
  const items = useSelector((state: RootState) => state.editor.items);

  return (
    <div className="w-1/3 bg-black text-green-300 p-4 font-mono text-sm rounded-lg overflow-auto h-screen">
      <pre>{JSON.stringify(items, null, 2)}</pre>
    </div>
  );
}
