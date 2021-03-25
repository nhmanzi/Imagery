import { combineReducers } from 'redux';
import PostReducer from './PostReducer';
import theme from './theme/themeChanger';

export default combineReducers({
  postList: PostReducer,
  AppTheme: theme
});
