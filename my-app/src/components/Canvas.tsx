"use client";
import React from "react";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { addItem, EditorItem } from "../future/editor/editorSlice";
import { RootState } from "../store/store";

const RenderItem: React.FC<{ item: EditorItem }> = ({ item }) => {
  const dispatch = useDispatch();

  const [, drop] = useDrop(
    () => ({
      accept: "BOX",
      drop: (childItem: { type: string }, monitor) => {
        if (item.type === "container") {
          if (monitor.didDrop()) return;

          dispatch(
            addItem({
              parentId: item.id,
              newItem: {
                id: Date.now().toString(),
                type: childItem.type,
                content: `${childItem.type} content`,
              },
            })
          );
        } else {
          console.warn(
            `🚫 Can't drop inside ${item.type}, only containers can hold children.`
          );
        }
      },
      canDrop: () => item.type === "container",
    }),
    [item]
  );

  return (
    <div
      ref={drop as unknown as React.Ref<HTMLDivElement>}
      className="border border-gray-300 bg-white rounded-xl p-3 my-3 shadow-sm hover:shadow-md transition-all duration-200"
    >
      <div className="flex items-center justify-between mb-1">
        <div className="text-sm font-semibold text-gray-700 capitalize">
          {item.type}
        </div>
        <div className="text-xs text-gray-400 italic">Drop inside</div>
      </div>

      {item.content && (
        <div className="text-gray-600 text-sm bg-gray-50 rounded p-2 mb-2">
          {item.content}
        </div>
      )}

      {/* Recursive child render */}
      {item.children && item.children.length > 0 && (
        <div className="ml-4 pl-3 border-l-2 border-dashed border-gray-300">
          {item.children.map((child) => (
            <RenderItem key={child.id} item={child} />
          ))}
        </div>
      )}
    </div>
  );
};

export default function Canvas() {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.editor.items);

  const [, drop] = useDrop(() => ({
    accept: "BOX",
    drop: (item: { type: string }, monitor) => {
      if (monitor.didDrop()) return;
      dispatch(
        addItem({
          newItem: {
            id: Date.now().toString(),
            type: item.type,
            content: `${item.type} content`,
          },
        })
      );
    },
  }));

  return (
    <div
      ref={drop as unknown as React.Ref<HTMLDivElement>}
      className="flex-1 min-h-screen p-6 bg-gradient-to-br from-gray-50 to-gray-100 overflow-auto border-l border-gray-200"
    >
      <div className="text-lg font-semibold text-gray-700 mb-4">
        🎨 Canvas Area
      </div>

      {items.length === 0 ? (
        <div className="h-[70vh] flex items-center justify-center text-gray-400 italic">
          Drag components from the sidebar and drop here.
        </div>
      ) : (
        items.map((item) => <RenderItem key={item.id} item={item} />)
      )}
    </div>
  );
}
