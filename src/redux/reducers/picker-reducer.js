
import * as PickerActions from '../action-types/picker-action-types';

function initWholeNumbers() {
  let wholeNumbers = [];
  for (let i = 0; i < 77; i++) {
    wholeNumbers.push({ value: i, selected: false });
  }
  return wholeNumbers;
}

function initDecimals() {
  let decimals = [];
  for (let i = 0; i <= 9; i++) {
    decimals.push({ value: '.' + i, selected: false });
  }
  return decimals;
}

const initialState = {
  wholeBrixDS: initWholeNumbers(),//new abc.DataSource({ rowHasChanged: (r1, r2) => { r1.selected !== r2.selected }}).cloneWithRows(initWholeNumbers()),
  decimalBrixDS: initDecimals(),//new abc.DataSource({ rowHasChanged: (r1, r2) => { r1.selected !== r2.selected }}).cloneWithRows(initDecimals()),
  wholeBrixNumbers: initWholeNumbers(), decimalBrixNumbers: initDecimals(),
  wholeDilutionDS: initWholeNumbers(),//new abc.DataSource({ rowHasChanged: (r1, r2) => { r1.selected !== r2.selected }}).cloneWithRows(initWholeNumbers()),
  decimalDilutionDS: initDecimals(),//new abc.DataSource({ rowHasChanged: (r1, r2) => { r1.selected !== r2.selected }}).cloneWithRows(initDecimals()),
  wholeDilutionNumbers: initWholeNumbers(), decimalDilutionNumbers: initDecimals(),
  brixWhole: 0, brixDecimal: 0, dilutionWhole: 0, dilutionDecimal: 0,
  brix: 0.0, dilution: 0.0
}

export default function picker(state = initialState, action) {
  switch (action.type) {
    case PickerActions.SET_WHOLE_BRIX_DS:
      return {
        ...state,
        wholeBrixDS: action.dataSource.map(item => ({ ...item })),
        wholeBrixNumbers: action.numbers.map(item => ({ ...item })),
        brixWhole: action.value,
        brix: parseFloat(action.value + '.' + state.brixDecimal)
      }

    case PickerActions.SET_DECIMAL_BRIX_DS:
      return {
        ...state,
        decimalBrixDS: action.dataSource.map(item => ({ ...item })),
        decimalBrixNumbers: action.numbers.map(item => ({ ...item })),
        brixDecimal: action.value,
        brix: parseFloat(state.brixWhole + '.' + action.brixDecimal)
      }

    case PickerActions.SET_WHOLE_DILUTION_DS:
      return {
        ...state,
        wholeDilutionDS: action.dataSource.map(item => ({ ...item })),
        wholeDilutionNumbers: action.numbers.map(item => ({ ...item }))
      }

    case PickerActions.SET_DECIMAL_DILUTION_DS:
      return {
        ...state,
        decimalDilutionDS: action.dataSource.map(item => ({ ...item })),
        decimalDilutionNumbers: action.numbers.map(item => ({ ...item }))
      }

    case PickerActions.SET_BRIX:
      const newWholeBrixNumbers = state.wholeBrixNumbers.map(item => ({
        ...item,
        selected: item.value === action.whole
      }));

      const newDecimalBrixNumbers = state.decimalBrixNumbers.map(item => ({
        ...item,
        selected: item.value === (parseFloat(action.decimal) / 10).toString()
      }));

      return {
        ...state,
        wholeBrixNumbers: newWholeBrixNumbers,
        decimalBrixNumbers: newDecimalBrixNumbers,
        wholeBrixDS: initWholeNumbers().map(item => ({ ...item })),
        decimalBrixDS: initDecimals().map(item => ({ ...item })),
        brix: parseFloat(state.brixWhole + '.' + state.brixDecimal)
      }

    default:
      return state;
  }
}

// export default function picker(state = initialState, action) {
//   // debugger
//   switch(action.type) {
//     case PickerActions.SET_WHOLE_BRIX_DS:
//       return {
//         ...state,
//         wholeBrixDS: action.dataSource,
//         wholeBrixNumbers: action.numbers,
//         brixWhole: action.value,
//         brix: parseFloat(action.value + '.' + state.brixDecimal)
//       }

//     case PickerActions.SET_DECIMAL_BRIX_DS:
//       return {
//         ...state,
//         decimalBrixDS: action.dataSource,
//         decimalBrixNumbers: action.numbers,
//         brixDecimal: action.value,
//         brix: parseFloat(state.brixWhole + '.' + action.brixDecimal)
//       }

//     case PickerActions.SET_WHOLE_DILUTION_DS:
//       return {
//         ...state,
//         wholeDilutionDS: action.dataSource,
//         wholeDilutionNumbers: action.numbers
//       }

//     case PickerActions.SET_DECIMAL_DILUTION_DS:
//       return {
//         ...state,
//         decimalDilutionDS: action.dataSource,
//         decimalDilutionNumbers: action.numbers
//       }

//     case PickerActions.SET_BRIX:
//     let whole = 0, decimal = 0;
//       for(let i = 0; i < state.wholeBrixNumbers.length; i++) {
//         if(state.wholeBrixNumbers[i].selected) {
//           state.wholeBrixNumbers[i].selected = false;
//           break;
//         }
//       }
//       for(let i = 0; i < state.wholeBrixNumbers.length; i++) {
//         if(state.wholeBrixNumbers[i].value == action.whole) {
//           state.wholeBrixNumbers[i].selected = true;
//           // whole = state.wholeBrixNumbers[i].value;
//           break;
//         }
//       }

//       for(let i = 0; i < state.decimalBrixNumbers.length; i++) {
//         if(state.decimalBrixNumbers[i].selected) {
//           state.decimalBrixNumbers[i].selected = false;
//           break;
//         }
//       }
//       for(let i = 0; i < state.decimalBrixNumbers.length; i++) {
//         if(state.decimalBrixNumbers[i].value == (parseFloat(action.decimal) / 10)) {
//           state.decimalBrixNumbers[i].selected = true;
//           // decimal = state.decimalBrixNumbers[i].value;
//           break;
//         }
//       }

//       return {
//         ...state,
//         wholeBrixNumbers: state.wholeBrixNumbers,
//         decimalBrixNumbers: state.decimalBrixNumbers,
//         wholeBrixDS: initWholeNumbers(),//new abc.DataSource({ rowHasChanged: (r1, r2) => { r1.selected !== r2.selected }}).cloneWithRows(state.wholeBrixNumbers),
//         decimalBrixDS: initDecimals(),//new abc.DataSource({ rowHasChanged: (r1, r2) => { r1.selected !== r2.selected }}).cloneWithRows(state.decimalBrixNumbers),
//         brix: parseFloat(state.brixWhole + '.' + state.brixDecimal)
//       }

//     default:
//       return state;
//   }
// }
