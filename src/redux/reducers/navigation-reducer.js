import { NavigationActions } from 'react-navigation';
import { AppNavigator } from '../../navigation/app-navigator';
import * as NavActions from '../action-types/nav-action-types';

const tempAction = AppNavigator.router.getActionForPathAndParams('MainCalc');
const tempState = AppNavigator.router.getStateForAction(tempAction);

// to set a different home screen, get Action and State.
// to animate screens, use NavigationActions
export default function nav(state = tempState, action) {
  let newState = state;
  let tempAction = {};

  switch(action.type) {
    case NavActions.HOME:
      newState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Home'}),
        state
      );
      return newState;

    case NavActions.PRODUCT:
      newState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Product' }),
        state
      );
      return newState;

    case NavActions.PRODUCT_DETAIL:
      newState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'ProductDetail' }),
        state
      );
      newState.product = action.product;
      return newState;

    case NavActions.TRADESHOW:
      newState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Tradeshow'}),
        state
      );
      return newState;

    case NavActions.START_CALC:
      newState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'MainCalc' }),
        state
      );
      return newState;

      // move to calc reducer
    case NavActions.MAIN_CALC:
      newState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'MainCalc' }),
        state
      );
      return newState;

    case NavActions.REQUEST_SAMPLE:
      newState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'RequestSample' }),
        state
      );
      return newState;

    case NavActions.BACK:
      newState = AppNavigator.router.getStateForAction(
        NavigationActions.back(),
        state
      );
      return newState;

    default:
      // state = tempState;
      return state;
  }
}
