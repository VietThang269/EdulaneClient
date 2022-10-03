export const getQuizzesStart = () => ({
  type: "GET_QUIZZES_START",
});

export const getQuizzesSuccess = (quizzes) => ({
  type: "GET_QUIZZES_SUCCESS",
  payload: quizzes,
});

export const getQuizzesFailure = () => ({
  type: "GET_QUIZZES_FAILURE",
});

export const deleteQuizzesStart = () => ({
  type: "DELETE_QUIZZES_START",
});

export const deleteQuizzesSuccess = (id) => ({
  type: "DELETE_QUIZZES_SUCCESS",
  payload: id,
});

export const deleteQuizzesFailure = () => ({
  type: "DELETE_QUIZZES_FAILURE",
});
