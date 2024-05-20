import { createSlice } from '@reduxjs/toolkit';

export const formSlice = createSlice({
  name: 'form',
  initialState: { isOpen: false},
  reducers: {
    openForm: (state) => {
      state.isOpen = true;
    },
    closedForm: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openForm, closedForm } = formSlice.actions;

export default formSlice.reducer;