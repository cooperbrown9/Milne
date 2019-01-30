import { combineReducers } from 'redux';
// import NavigationReducer from './navigation-reducer';
import nav from './navigation-reducer';
import user from './user-reducer';
import menu from './menu-reducer';
import calc from './calc-reducer';
import conversion from './conversion-reducer';
import sample from './sample-request-reducer';
import tradeshow from './tradeshow-reducer';
import picker from './picker-reducer';

export default MainReducer = combineReducers({
  nav,
  user,
  menu,
  calc,
  conversion,
  sample,
  tradeshow,
  picker
});
