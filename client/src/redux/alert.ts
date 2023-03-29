import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AlertColor } from '@mui/material';

type Alert = {
  message: string;
  severity: AlertColor;
  checked: boolean;
};

const initialState = {
  message: '',
  severity: '',
  checked: false,
};

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    showNewAlert: (state, action: PayloadAction<Alert>) => {
      const { message, severity, checked } = action.payload;

      if (message && severity && checked) {
        return action.payload;
      }
    },
  },
});

export const { showNewAlert } = alertSlice.actions;

export default alertSlice.reducer;
