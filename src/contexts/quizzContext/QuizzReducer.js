const QuizzReducer = (state, action) => {
  switch (action.type) {
    case "GET_QUIZZES_START":
      return {
        quizzes: [],
        isFetching: true,
        error: false,
      };
    case "GET_QUIZZES_SUCCESS":
      return {
        quizzes: action.payload,
        isFetching: false,
        error: false,
      };
    case "GET_QUIZZES_FAILURE":
      return {
        quizzes: [],
        isFetching: false,
        error: true,
      };

    case "DELETE_QUIZZES_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "DELETE_QUIZZES_SUCCESS":
      return {
        quizzes: state.quizzes.filter(
          (quizze) => quizze._id !== action.payload
        ),
        isFetching: false,
        error: false,
      };
    case "DELETE_QUIZZES_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };

    default:
      return { ...state };
  }
};

export default QuizzReducer;
