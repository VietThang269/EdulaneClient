import CourseReducer from "./CourseReducer";
import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  courses: [],
  isFetching: false,
  error: false,
};

export const CourseContext = createContext(INITIAL_STATE);

export const CourseContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CourseReducer, INITIAL_STATE);

  return (
    <CourseContext.Provider
      value={{
        courses: state.courses,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};
