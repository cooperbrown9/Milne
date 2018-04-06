import * as TradeshowActions from '../action-types/tradeshow-action-types';

const initialState = {
  tradeshows: [],
  canCreate: false
}

export default function tradeshow(state = initialState, action) {
  switch(action.type) {
    case TradeshowActions.CREATE_TRADESHOW:
      return {
        ...state,
        tradeshows: [...state.tradeshows, action.tradeshow]
      }

    case TradeshowActions.SET_TRADESHOWS:
      return {
        ...state,
        tradeshows: action.tradeshows
      }

    default:
      return state;
  }
}
