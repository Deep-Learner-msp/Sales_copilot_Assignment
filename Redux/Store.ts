// redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import pitchCreatorSlice from './Slices/pitchCreatorSlice';
import salesChatSlice from './Slices/salesChatSlice';
import marketInsightsSlice from './Slices/marketInsightsSlice';

// Configure the store with the reducers
export const store = configureStore({
  reducer: {
    pitchCreator: pitchCreatorSlice,
    salesChat: salesChatSlice,
    marketInsights: marketInsightsSlice,
  },
});

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
