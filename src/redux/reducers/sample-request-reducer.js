
import * as SampleActions from '../action-types/sample-request-action-types';

const intialState = {
  samples: [],
  onEdit: false,
  sampleToEdit: null,
  indexOfSelected: null
}

export default function sample (state = intialState, action) {
  switch(action.type) {
    case SampleActions.ADD_SAMPLE:
      return {
        ...state,
        onEdit: false,
        samples: [...state.samples, action.sample]
      }

    case SampleActions.EDIT_SAMPLE:
      return {
        ...state,
        onEdit: true,
        indexOfSelected: action.index,
        sampleToEdit: state.samples[action.index]
      }

    case SampleActions.UPDATE_SAMPLE:
      state.samples[state.indexOfSelected] = action.sample;
      return {
        ...state,
        onEdit: false,
        sampleToEdit: null,
        indexOfSelected: null,
        samples: state.samples
      }

    case SampleActions.DELETE_SAMPLE:
      state.samples.splice(state.indexOfSelected, 1);
      return {
        ...state,
        onEdit: false,
        sampleToEdit: null,
        indexOfSelected: null,
        samples: state.samples
      }

    default:
      return state;
  }

}
