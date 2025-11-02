import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface EditorItem {
  id: string;
  type: string;
  content?: string;
  children?: EditorItem[];
}

interface EditorState {
  items: EditorItem[];
  parentId?: string;
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
      action: PayloadAction<{ parentId?: string; newItem: EditorItem }>
    ) => {
      const { parentId, newItem } = action.payload;
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
    updateItem: (state, action: PayloadAction<{ id: string; content: string }>) => {
      const item = findItemById(state.items, action.payload.id);
      if (item) item.content = action.payload.content;
    },
  },
});

export const { addItem, updateItem } = editorSlice.actions;
export default editorSlice.reducer;
