import { componentDefaults } from "@/componentDefaults";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface EditorItem {
  id: string;
  type: string;
  props: Record<string, any>; // dynamic props for any component
  children?: EditorItem[];
}

interface EditorState {
  items: EditorItem[];
  // parentId?: string;
}

const initialState: EditorState = {
  items: [],
};

const findItemById = (items: EditorItem[], id: string): EditorItem | undefined => {
  for (const item of items) {
    if (item.id === id) return item;
    if (item.children) {
      const found = findItemById(item.children, id);
      if (found) return found;
    }
  }
};

const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    addItem: (
      state,
      action: PayloadAction<{ parentId?: string; type: string }>
    ) => {
      const { parentId, type } = action.payload;
      const newItem: EditorItem = {
        id: Date.now().toString(),
        type,
        props: componentDefaults[type] || {},
      };

      if (!parentId) {
        state.items.push(newItem);
      } else {
        const parent = findItemById(state.items, parentId);
        if (parent) {
          parent.children = parent.children || [];
          parent.children.push(newItem);
        }
      }
    },
    updateProps: (
      state,
      action: PayloadAction<{ id: string; props: Record<string, any> }>
    ) => {
      const item = findItemById(state.items, action.payload.id);
      if (item) {
        item.props = { ...item.props, ...action.payload.props };
      }
    },
  },
});

export const { addItem, updateProps } = editorSlice.actions;
export default editorSlice.reducer;