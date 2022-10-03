const CourseReducer = (state, action) => {
  switch (action.type) {
    case "GET_COURSES_START":
      return {
        courses: [],
        isFetching: true,
        error: false,
      };
    case "GET_COURSES_SUCCESS":
      return {
        courses: action.payload,
        isFetching: false,
        error: false,
      };
    case "GET_COURSES_FAILURE":
      return {
        courses: [],
        isFetching: false,
        error: true,
      };

    case "JOIN_COURSES_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "JOIN_COURSES_SUCCESS":
      console.log(action.payload);
      return {
        courses: [...state.courses, action.payload],
        isFetching: false,
        error: false,
      };
    case "JOIN_COURSES_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };

    case "CREATE_COURSES_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "CREATE_COURSES_SUCCESS":
      console.log(action.payload);
      return {
        courses: [...state.courses, action.payload],
        isFetching: false,
        error: false,
      };
    case "CREATE_COURSES_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };

    default:
      return { ...state };
  }
};

export default CourseReducer;
