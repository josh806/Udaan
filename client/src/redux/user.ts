import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

// Define a type for the slice state
type UserState = {
  name: string;
  inCall: boolean;
};

// Define the initial state using that type
const initialState: UserState = {
  name: 'Joaquin',
  inCall: false,
};

export const userSlice = createSlice({
  name: 'users',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    enterVideoCall: (state) => {
      state.inCall = true;
    },
    endVideoCall: (state) => {
      state.inCall = false;
    },
  },
});

export const { updateName, enterVideoCall, endVideoCall } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.users.name;
export const checkInCall = (state: RootState) => state.users.inCall;

export default userSlice.reducer;
