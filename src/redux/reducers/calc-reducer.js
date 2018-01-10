
import { ListView } from 'react-native';
import * as CalcActions from '../action-types/calc-action-types';

const ON_DILUTION = 0;
const ON_JUICE = 1;
const ON_COST = 2;

const initialState = {
  brix: 0.0,
  juice: '',
  indexOn: ON_DILUTION,
  data: [],
  dataLoaded: false,
  meta: null
};

export default function calc(state = initialState, action) {
  switch(action.type) {
    case CalcActions.SET_BRIX:
      return {
        ...state,
        brix: action.brix
      }

    case CalcActions.SET_BRIX_AND_META:
      return {
        ...state,
        brix: action.brix,
        meta: action.meta
      }
    
    case CalcActions.GOTO_DILUTION:
      return {
        ...state,
        indexOn: ON_DILUTION
      }

    case CalcActions.GOTO_JUICE:
      return {
        ...state,
        indexOn: ON_JUICE
      }

    case CalcActions.GOTO_COST:
      return {
        ...state,
        indexOn: ON_COST
      }


    case CalcActions.SET_DATA:
      return {
        ...state,
        data: action.data,
        dataLoaded: true
      }


    default:
      return state;
  }
}
