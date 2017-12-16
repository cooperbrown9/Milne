
import { ListView } from 'react-native';
import * as CalcActions from '../action-types/calc-action-types';

const ON_DILUTION = 0;
const ON_JUICE = 1;
const ON_COST = 2;

const initialState = { brix: 0.0, juice: '', indexOn: ON_DILUTION, dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2}), data: [] };

export default function calc(state = initialState, action) {
  switch(action.type) {
    case CalcActions.SET_BRIX:
      return {
        ...state,
        brix: action.brix
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

    case CalcActions.SET_DATASOURCE:
      return {
        ...state,
        dataSource: action.dataSource
      }

    case CalcActions.SET_DATA:
      return {
        ...state,
        data: action.data
      }

    case CalcActions.SET_DATA_AND_SOURCE:
      return {
        ...state,
        data: action.data,
        dataSource: action.dataSource
      }

    default:
      return state;
  }
}
