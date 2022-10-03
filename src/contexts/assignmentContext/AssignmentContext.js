import { createContext, useReducer } from "react";
import AssignmentReducer from "./AssignmentReducer";

const INITIAL_STATE = {
  assignments: [],
  isFetching: false,
  error: false,
};

export const AssignmentContext = createContext(INITIAL_STATE);

export const AssignmentContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AssignmentReducer, INITIAL_STATE);

  return (
    <AssignmentContext.Provider
      value={{
        assignments: state.assignments,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AssignmentContext.Provider>
  );
};
