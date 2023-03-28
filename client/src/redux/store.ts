import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './user';
import lessonReducer from './lesson';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    lesson: lessonReducer,

  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
