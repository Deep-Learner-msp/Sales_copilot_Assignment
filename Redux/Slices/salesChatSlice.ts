// redux/slices/salesChatSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define interfaces for the state
interface SalesChatState {
  messages: string[];
}

// Define the initial state
const initialState: SalesChatState = {
  messages: [],
};

// Create the slice
const salesChatSlice = createSlice({
  name: 'salesChat',
  initialState,
  reducers: {
    // Add a message to the sales chat
    addMessage: (state, action: PayloadAction<string>) => {
      state.messages.push(action.payload);
    },
    // Clear the chat for a new session
    clearChat: (state) => {
      state.messages = [];
    },
  },
});

// Export the actions
export const { addMessage, clearChat } = salesChatSlice.actions;

// Export the reducer to be included in the store
export default salesChatSlice.reducer;
