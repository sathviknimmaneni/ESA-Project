const initState = {};

const userData = (state = initState, action) => {
  switch (action.type) {
    case "ADD_SIGNEDIN":
      return {
        ...state,
        isSignedIn: action.payload.data.isSignedIn,
      };
    case "ADD_USER":
      return {
        ...state,
        ...action.payload.data,
      };
    default:
      return state;
  }
};
export default userData;
