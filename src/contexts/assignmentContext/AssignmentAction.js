export const getAssignmentsStart = () => ({
  type: "GET_ASSIGNMENTS_START",
});

export const getAssignmentsSuccess = (assignments) => ({
  type: "GET_ASSIGNMENTS_SUCCESS",
  payload: assignments,
});

export const getAssignmentsFailure = () => ({
  type: "GET_ASSIGNMENTS_FAILURE",
});

export const createAssignmentsStart = () => ({
  type: "CREATE_ASSIGNMENTS_START",
});

export const createAssignmentsSuccess = (assignments) => ({
  type: "CREATE_ASSIGNMENTS_SUCCESS",
  payload: assignments,
});

export const createAssignmentsFailure = () => ({
  type: "CREATE_ASSIGNMENTS_FAILURE",
});

export const deleteAssignmentsStart = () => ({
  type: "DELETE_ASSIGNMENTS_START",
});

export const deleteAssignmentsSuccess = (id) => ({
  type: "DELETE_ASSIGNMENTS_SUCCESS",
  payload: id,
});

export const deleteAssignmentsFailure = () => ({
  type: "DELETE_ASSIGNMENTS_FAILURE",
});
