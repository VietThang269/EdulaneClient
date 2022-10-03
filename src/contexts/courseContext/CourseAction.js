export const getCoursesStart = () => ({
  type: "GET_COURSES_START",
});

export const getCoursesSuccess = (courses) => ({
  type: "GET_COURSES_SUCCESS",
  payload: courses,
});

export const getCoursesFailure = () => ({
  type: "GET_COURSES_FAILURE",
});

export const joinCoursesStart = () => ({
  type: "JOIN_COURSES_START",
});

export const joinCoursesSuccess = (courses) => ({
  type: "JOIN_COURSES_SUCCESS",
  payload: courses,
});

export const joinCoursesFailure = () => ({
  type: "JOIN_COURSES_FAILURE",
});

export const createCoursesStart = () => ({
  type: "CREATE_COURSES_START",
});

export const createCoursesSuccess = (courses) => ({
  type: "CREATE_COURSES_SUCCESS",
  payload: courses,
});

export const createCoursesFailure = () => ({
  type: "CREATE_COURSES_FAILURE",
});
