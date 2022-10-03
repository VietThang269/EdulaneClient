const AssignmentReducer = (state, action) => {
  switch (action.type) {
    case "GET_ASSIGNMENTS_START":
      return {
        assignments: [],
        isFetching: true,
        error: false,
      };
    case "GET_ASSIGNMENTS_SUCCESS":
      return {
        assignments: action.payload,
        isFetching: false,
        error: false,
      };
    case "GET_ASSIGNMENTS_FAILURE":
      return {
        assignments: [],
        isFetching: false,
        error: true,
      };

    case "DELETE_ASSIGNMENTS_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "DELETE_ASSIGNMENTS_SUCCESS":
      return {
        assignments: state.assignments.filter(
          (assignment) => assignment._id !== action.payload
        ),
        isFetching: false,
        error: false,
      };
    case "DELETE_ASSIGNMENTS_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };

    default:
      return { ...state };
  }
};

export default AssignmentReducer;
