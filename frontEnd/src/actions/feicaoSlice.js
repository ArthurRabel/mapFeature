import { createSlice } from '@reduxjs/toolkit';

export const feicaoSlice = createSlice({
  name: 'feicao',
  initialState: [],
  reducers: {
    addFeicao: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addFeicao } = feicaoSlice.actions;

export default feicaoSlice.reducer;