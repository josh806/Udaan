import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { User } from '../types/types';

// Define a type for the slice state


// Define the initial state using that type
const initialState:User = {
  inCall: false,
  id:'',
  firstName:'',
  lastName:'',
  email:'',
  username:'',
  student:true,
  newUser:true,
  schoolId:0,
};


export const userSlice = createSlice({
  name: 'users',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<User>) => {
      const tempState = {...action.payload };
      state = tempState;
      return state;

    },
    enterVideoCall: (state) => {
      state.inCall = true;
    },
    endVideoCall: (state) => {
      state.inCall = false;
    },
  },
});

export const { updateUser, enterVideoCall, endVideoCall } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectUser = (state: RootState) => state.users.name;
// export const checkInCall = (state: RootState) => state.users.inCall;

export default userSlice.reducer;
