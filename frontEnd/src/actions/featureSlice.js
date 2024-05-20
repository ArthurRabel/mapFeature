import { createSlice } from '@reduxjs/toolkit';

export const featureSlice = createSlice({
  name: 'feature',
  initialState: [],
  reducers: {
    addFeature: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addFeature } = featureSlice.actions;

export default featureSlice.reducer;