import { configureStore } from '@reduxjs/toolkit';
import feicaoReducer from './actions/feicaoSlice.js';
import formReducer from './actions/formSlice.js';
import aboutFeatureReducer from './actions/aboutFeatureSlice.js';


export default configureStore({
  reducer: {
    feicao: feicaoReducer,
    form: formReducer,
    aboutFeature: aboutFeatureReducer,
  },
});