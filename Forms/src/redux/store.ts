import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import mainReducer from './features/mainSlice';
import userReducer from './features/userSlice';

export const store = configureStore({
  reducer: {
    main: mainReducer,
    user: userReducer,
  },
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
