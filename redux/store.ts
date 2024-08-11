import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { setupListeners } from '@reduxjs/toolkit/query';
import { swapiApi } from './services/swapiApi';
import mainReducer from './features/mainSlice';
import pageReducer from './features/pageSlice';

export const makeStore = () =>
  configureStore({
    reducer: {
      [swapiApi.reducerPath]: swapiApi.reducer,
      main: mainReducer,
      page: pageReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(swapiApi.middleware),
  });

setupListeners(makeStore().dispatch);

export type RootState = ReturnType<ReturnType<typeof makeStore>['getState']>;
export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];

export const wrapper = createWrapper(makeStore);
