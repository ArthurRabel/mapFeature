import { configureStore } from '@reduxjs/toolkit';
import featureReducer from './actions/featureSlice.js';
import formReducer from './actions/formSlice.js';
import aboutFeatureReducer from './actions/aboutFeatureSlice.js';


export default configureStore({
  reducer: {
    feature: featureReducer,
    form: formReducer,
    aboutFeature: aboutFeatureReducer,
  },
});