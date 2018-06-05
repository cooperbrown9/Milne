
import * as MenuActions from '../action-types/menu-action-types';
import * as SCREEN_INDEX from '../../constants/screen-index';

const initialState = { isOpen: false, indexOn: SCREEN_INDEX.CALC_INDEX };

// calculator: 0
// products: 1
// tradeshow: 2

export default function menu(state = initialState, action) {
  // console.log(state);
  // debugger;
  switch(action.type) {

    case MenuActions.OPEN_FROM_PRODUCT:
      return {
        ...state,
        isOpen: true,
        indexOn: SCREEN_INDEX.PRODUCT_INDEX
      }

    case MenuActions.OPEN_FROM_CALC:
      return {
        ...state,
        isOpen: true,
        indexOn: SCREEN_INDEX.CALC_INDEX
      }

    case MenuActions.OPEN_FROM_TRADESHOW:
      return {
        ...state,
        isOpen: true,
        indexOn: SCREEN_INDEX.TRADESHOW_INDEX
      }

    case MenuActions.OPEN_FROM_CONTACT:
      return {
        ...state,
        isOpen: true,
        indexOn: SCREEN_INDEX.CONTACT_INDEX
      }

    case MenuActions.CLOSE:
      return {
        ...state,
        isOpen: false
      };

      default:
        return state;
  }
}
