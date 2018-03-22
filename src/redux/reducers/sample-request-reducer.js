
import * as SampleActions from '../action-types/sample-request-action-types';

const intialState = {
  samples: []
}

export default function sample (state = intialState, action) {
  switch(action.type) {
    case SampleActions.ADD_SAMPLE:
      return {
        ...state,
        samples: [...state.samples, action.sample]
      }

    default:
      return state;
  }

}
