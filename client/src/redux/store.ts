import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './user';
import lessonReducer from './lesson';
import loadingReducer from './loading';
import alertReducer from './alert';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    lesson: lessonReducer,
    loading: loadingReducer,
    alert: alertReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
