import { combineReducers } from 'redux';
import reviewReducer from './reviewReducer';
import userReducer from './userReducer';
import systemReducer from './systemReducer';
import {movieReducer} from './movieReducer';

const rootReducer = combineReducers({
  system: systemReducer,
  review: reviewReducer,
  user: userReducer,
  movie: movieReducer
})

export default rootReducer;