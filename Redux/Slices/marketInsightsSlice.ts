// redux/slices/marketInsightsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MarketInsight {
  companyName: string;
  latestAttacks: string;
  painPoints: string;
}

interface MarketInsightsState {
  insights: MarketInsight | null;
}

const initialState: MarketInsightsState = {
  insights: null,
};

// Create the slice
const marketInsightsSlice = createSlice({
  name: 'marketInsights',
  initialState,
  reducers: {
    // Set the market insights based on the API response
    setMarketInsights: (state, action: PayloadAction<MarketInsight>) => {
      state.insights = action.payload;
    },
    // Clear the market insights for a new session
    clearMarketInsights: (state) => {
      state.insights = null;
    },
  },
});

// Export the actions
export const { setMarketInsights, clearMarketInsights } = marketInsightsSlice.actions;

// Export the reducer to be included in the store
export default marketInsightsSlice.reducer;
