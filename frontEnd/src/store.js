import { configureStore } from '@reduxjs/toolkit';
import formReducer from './actions/formSlice.js';
import aboutFeatureReducer from './actions/aboutFeatureSlice.js';


export default configureStore({
  reducer: {
    form: formReducer,
    aboutFeature: aboutFeatureReducer,
  },
});