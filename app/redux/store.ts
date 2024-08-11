import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { swapiApi } from './services/swapiApi';
import mainReducer from './features/mainSlice';
import pageReducer from './features/pageSlice';

export const store = configureStore({
  reducer: {
    [swapiApi.reducerPath]: swapiApi.reducer,
    main: mainReducer,
    page: pageReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(swapiApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
