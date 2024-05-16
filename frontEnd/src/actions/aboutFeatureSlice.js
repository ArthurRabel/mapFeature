import { createSlice } from '@reduxjs/toolkit';

export const aboutFeatureSlice = createSlice({
  name: 'aboutFeature',
  initialState: { isOpen: false},
  reducers: {
    toggleAboutFeature: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { toggleAboutFeature} = aboutFeatureSlice.actions;

export default aboutFeatureSlice.reducer;