const initState = {};

const searchData = (state = initState, action) => {
  switch (action.type) {
    case "ADD_STATUS":
      return {
        ...state,
        status: action.payload.status,
      };
    case "ADD_CHECKBOX":
      return {
        ...state,
        ...action.payload.data,
      };
    default:
      return state;
  }
};
export default searchData;
