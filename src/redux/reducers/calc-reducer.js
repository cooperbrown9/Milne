
import * as CalcActions from '../action-types/calc-action-types';
const initialState = { brix: 0.0, juice: '' };

export default function calc(state = initialState, action) {

  switch(action) {
    case CalcActions.SET_BRIX:
      return {
        ...state,
        brix: action.brix
      }

    default:
      return state;
  }
}
