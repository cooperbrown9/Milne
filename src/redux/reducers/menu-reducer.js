
import * as MenuActions from '../action-types/menu-action-types';

const initialState = { isOpen: false, indexOn: 0 };
const PRODUCT_INDEX = 0;
const CALC_INDEX = 1;
const TRADESHOW_INDEX = 2;
// products: 0
// calculator: 1
// tradeshow: 2

export default function menu(state = initialState, action) {
  console.log(state);
  debugger;
  switch(action.type) {

    case MenuActions.OPEN_FROM_PRODUCT:
      return {
        ...state,
        isOpen: true,
        indexOn: PRODUCT_INDEX
      }

    case MenuActions.OPEN_FROM_CALC:
      return {
        ...state,
        isOpen: true,
        indexOn: CALC_INDEX
      }

    case MenuActions.OPEN_FROM_TRADESHOW:
      return {
        ...state,
        isOpen: true,
        indexOn: TRADESHOW_INDEX
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
