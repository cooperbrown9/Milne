
var initialState = {
  loggedIn: false
};

export default function user(state = initialState, action) {
  switch(action.type) {
    case 'LOGIN':
      return {
        ...initialState,
        loggedIn: true
      }
      break;
    default:
      return initialState;
  }
}
