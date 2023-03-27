import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
// import { User } from '../types/types';

// Define a type for the slice state

// Define the initial state using that type
const initialState = {
  lessonId: '',
  whiteboardToken: '',
  whiteboardId: '',
};

export const lessonSlice = createSlice({
  name: 'lesson',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateLesson: (state, action: PayloadAction) => {
      // console.log(state);
      return action.payload;

      // return {
      //   ...state,
      //   ...action.payload,
      // };

      // const tempState = { ...action.payload };
      // state = tempState;
      // return state;
    },
    // enterVideoCall: (state) => {
    //   state.inCall = true;
    // },
    // endVideoCall: (state) => {
    //   state.inCall = false;
    // },
  },
});

export const { updateLesson } = lessonSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectUser = (state: RootState) => state.users.name;
// export const checkInCall = (state: RootState) => state.users.inCall;

export default lessonSlice.reducer;
