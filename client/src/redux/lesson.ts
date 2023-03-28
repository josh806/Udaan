import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Lesson } from '../types/types';

const initialState = {
  id: '',
  whiteboardToken: '',
  whiteboardId: '',
};

export const lessonSlice = createSlice({
  name: 'lesson',
  initialState,
  reducers: {
    updateLesson: (state, action: PayloadAction<Lesson>) => {
      const { id, whiteboardToken, whiteboardId } = action.payload;

      if (id && whiteboardToken && whiteboardId) {
        return {
          id,
          whiteboardToken,
          whiteboardId,
        };
      }
    },
  },
});

export const { updateLesson } = lessonSlice.actions;

export default lessonSlice.reducer;
