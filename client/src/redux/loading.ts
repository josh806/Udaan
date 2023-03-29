import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  isLoading: true,
  isRegistered: false,
};

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    loadingComplete: (state) => {
      state.isLoading = false;
    },
    registeredInDatabase: (state) => {
      state.isRegistered = true;
    },
  },
});

export const { loadingComplete, registeredInDatabase } = loadingSlice.actions;

export default loadingSlice.reducer;
