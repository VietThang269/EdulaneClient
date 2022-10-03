import { createContext, useReducer } from "react";
import QuizzReducer from "./QuizzReducer";

const INITIAL_STATE = {
  quizzes: [],
  isFetching: false,
  error: false,
};

export const QuizzContext = createContext(INITIAL_STATE);

export const QuizzContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(QuizzReducer, INITIAL_STATE);

  return (
    <QuizzContext.Provider
      value={{
        quizzes: state.quizzes,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </QuizzContext.Provider>
  );
};
