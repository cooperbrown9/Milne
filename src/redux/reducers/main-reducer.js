import { combineReducers } from 'redux';
import NavigationReducer from './navigation-reducer';
import nav from './navigation-reducer';
import user from './user-reducer';
import menu from './menu-reducer';
import calc from './calc-reducer';

export default MainReducer = combineReducers({
  nav,
  user,
  menu,
  calc
});
