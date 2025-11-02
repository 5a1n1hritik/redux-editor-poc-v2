"use client";
import React from "react";
import { useDrag } from "react-dnd";

const SidebarItem = ({ type, label }: { type: string; label: string }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "BOX",
    item: { type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag as unknown as React.Ref<HTMLDivElement>}
      className={`p-3 mb-3 text-sm font-medium border rounded-xl cursor-grab 
      bg-white shadow-sm transition-all duration-200 select-none 
      hover:bg-blue-50 hover:border-blue-400 hover:shadow-md 
      active:cursor-grabbing
      ${isDragging ? "opacity-50 scale-95" : "opacity-100"}
      `}
    >
      {label}
    </div>
  );
};

export default function Sidebar() {
  return (
    <div
      className="w-56 h-full border-r bg-gradient-to-b from-gray-50 to-gray-100 
      p-4 flex flex-col shadow-inner"
    >
      <h2 className="text-lg font-semibold text-gray-700 mb-4">🧩 Components</h2>

      <SidebarItem type="text" label="Text Block" />
      <SidebarItem type="image" label="Image Block" />
      <SidebarItem type="container" label="Container" />
      <SidebarItem type="button" label="Button" />

      <div className="mt-auto text-xs text-gray-400 text-center border-t pt-2">
        Drag items into canvas →
      </div>
    </div>
  );
}
