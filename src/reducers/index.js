import { combineReducers } from 'redux';
import images from './imageReducer';
import videos from './videoReducer';

// combine all reducers to a single reducer function
const rootReducer = combineReducers({
  images,
  videos
});

export default rootReducer;
