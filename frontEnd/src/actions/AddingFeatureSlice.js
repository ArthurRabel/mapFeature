import { createSlice } from '@reduxjs/toolkit';

export const addingFeatureSlice = createSlice({
  name: 'addingFeature',
  initialState: { addingFeature: false},
  reducers: {
    isAddingFeature: (state) => {
      state.addingFeature = true;
    },
    notAddingFeature: (state) => {
      state.addingFeature = false;
    },
  },
});

export const { isAddingFeature, notAddingFeature } = addingFeatureSlice.actions;

export default addingFeatureSlice.reducer;