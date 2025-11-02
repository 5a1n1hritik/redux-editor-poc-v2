"use client";

import Sidebar from "./Sidebar";
import Canvas from "./Canvas";
import JSONPreview from "./JSONPerview";

export default function EditorLayout() {
  return (
    <div className="flex min-h-screen text-black">
      <Sidebar />
      <Canvas />
      <JSONPreview />
    </div>
  );
}
