import axios from "axios";
import {
  getAssignmentsStart,
  getAssignmentsSuccess,
  getAssignmentsFailure,
  deleteAssignmentsStart,
  deleteAssignmentsSuccess,
  deleteAssignmentsFailure,
} from "./AssignmentAction";
import { apiUrl } from "../../constants";

export const getAssignment = async (dispatch) => {
  dispatch(getAssignmentsStart());
  try {
    const res = await axios.get(`${apiUrl}assignments/`);
    dispatch(getAssignmentsSuccess(res.data));
  } catch (err) {
    dispatch(getAssignmentsFailure());
  }
};

export const getAssignmentByID = async (id, dispatch) => {
  dispatch(getAssignmentsStart());
  try {
    const res = await axios.get(`${apiUrl}assignments/?class_id=${id}`);
    console.log(res.data);
    dispatch(getAssignmentsSuccess(res.data));
  } catch (err) {
    dispatch(getAssignmentsFailure());
  }
};

export const deleteAssignment = async (id, dispatch) => {
  dispatch(deleteAssignmentsStart());
  try {
    const res = await axios.delete(`${apiUrl}assignments/${id}`);
    console.log(res.data);
    dispatch(deleteAssignmentsSuccess(id));
  } catch (err) {
    dispatch(deleteAssignmentsFailure());
  }
};
