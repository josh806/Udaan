import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { User } from '../types/types';

// Define a type for the slice state

// Define the initial state using that type
const initialState: User = {
  inCall: false,
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  student: true,
  newUser: true,
  schoolId: 'a1b2',
  avatar: 'Jake',
  isReading: false,
};

export const userSlice = createSlice({
  name: 'users',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<User>) => {
      // const tempState = { ...action.payload };
      state = action.payload;
      return state;
    },
    enterVideoCall: (state) => {
      state.inCall = true;
    },
    endVideoCall: (state) => {
      state.inCall = false;
    },
    openLibrary: (state) => {
      state.isReading = true;
    },
    closeLibrary: (state) => {
      state.isReading = false;
    },
  },
});

export const {
  updateUser,
  enterVideoCall,
  endVideoCall,
  openLibrary,
  closeLibrary,
} = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectUser = (state: RootState) => state.users.name;
// export const checkInCall = (state: RootState) => state.users.inCall;

export default userSlice.reducer;
