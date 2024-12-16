// redux/slices/pitchCreatorSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define interfaces for the state
interface ConversationHistoryItem {
  message: string;
  timestamp: string;
}

interface PitchCreatorState {
  conversationHistory: ConversationHistoryItem[];
  pitchPresentation: string | null;
}

// Define the initial state
const initialState: PitchCreatorState = {
  conversationHistory: [],
  pitchPresentation: null,
};

// Create the slice
const pitchCreatorSlice = createSlice({
  name: 'pitchCreator',
  initialState,
  reducers: {
    // Add a message to the conversation history
    addToHistory: (state, action: PayloadAction<ConversationHistoryItem>) => {
      state.conversationHistory.push(action.payload);
    },
    // Set the pitch presentation
    setPitchPresentation: (state, action: PayloadAction<string>) => {
      state.pitchPresentation = action.payload;
    },
    // Reset the state when a new session starts
    resetPitchCreator: (state) => {
      state.conversationHistory = [];
      state.pitchPresentation = null;
    },
  },
});

// Export the actions
export const { addToHistory, setPitchPresentation, resetPitchCreator } = pitchCreatorSlice.actions;

// Export the reducer to be included in the store
export default pitchCreatorSlice.reducer;
