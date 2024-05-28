import { createSlice } from '@reduxjs/toolkit';

export const aboutFeatureSlice = createSlice({
  name: 'aboutFeature',
  initialState: { isOpen: false},
  reducers: {
    openAboutFeature: (state) => {
      state.isOpen = true;
    },
    closedAboutFeature: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openAboutFeature, closedAboutFeature } = aboutFeatureSlice.actions;

export default aboutFeatureSlice.reducer;