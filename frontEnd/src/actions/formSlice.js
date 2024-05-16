import { createSlice } from '@reduxjs/toolkit';

export const formSlice = createSlice({
  name: 'form',
  initialState: { isOpen: false},
  reducers: {
    toggleForm: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { toggleForm } = formSlice.actions;

export default formSlice.reducer;