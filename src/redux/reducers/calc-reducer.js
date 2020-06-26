
import * as CalcActions from '../action-types/calc-action-types';
var _ = require('lodash');

const ON_BRIX = 0;
const ON_DILUTION = 1;
const ON_JUICE = 2;
const ON_COST = 3;

const initialState = {
  brix: 0.0,
  startingBrix: 0.0,
  startingBrixWhole: 0,
  startingBrixDecimal: 0,
  dilutionBrix: 0.0,
  dilutionBrixWhole: 0,
  dilutionBrixDecimal: 0,
  // meta: {
  //   lbsPerGal: 0.0,
  //   solidLbsPerGal: 0.0,
  //   kgPerGal: 0.0,
  //   solidLbsPerMetricTon: 0.0,
  //   totalGallonspermetricTon: 0.0
  // },
  // cost: {
  //   perGallon: 0.0,
  //   perLB: 0.0,
  //   perMetricTon: 0.0,
  //   perLBSolid: 0.0
  // },
  indexOn: ON_BRIX,
  juice: '',
  data: [],
  dataLoaded: false,
};

export default function calc(state = initialState, action) {
  switch(action.type) {

    case CalcActions.SET_STARTING_BRIX:
      return {
        ...state,
        startingBrixWhole: action.wholeBrix,
        startingBrixDecimal: action.decimalBrix,
        startingBrix: parseFloat(action.wholeBrix + '.' + action.decimalBrix)
      }

    case CalcActions.SET_DILUTION_BRIX:
      return {
        ...state,
        dilutionBrixWhole: action.wholeBrix,
        dilutionBrixDecimal: action.decimalBrix,
        dilutionBrix: parseFloat(action.wholeBrix + '.' + action.decimalBrix)
      }

    case CalcActions.SET_CONCENTRATION_LEVEL:
      return {
        ...state,
        concentrationLevel: action.concentrationLevel
      }


    case CalcActions.GOTO_BRIX:
      return {
        ...state,
        indexOn: ON_BRIX
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

    case CalcActions.SET_WHOLE_DATASOURCE:
      return {
        ...state,
        wholeDataSource: action.dataSource,
        wholeNumbers: action.numbers,
        startingBrix: parseFloat(action.brix + '.' + state.startingBrixDecimal)
      }

    case CalcActions.SET_DECIMAL_DATASOURCE:
      return {
        ...state,
        decimalDataSource: action.dataSource,
        decimals: action.numbers,
        startingBrix: parseFloat(state.startingBrixWhole + '.' + action.brix)
      }


    default:
      return state;
  }
}
