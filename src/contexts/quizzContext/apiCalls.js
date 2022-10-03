import axios from "axios";
import {
  getQuizzesStart,
  getQuizzesSuccess,
  getQuizzesFailure,
  deleteQuizzesStart,
  deleteQuizzesSuccess,
  deleteQuizzesFailure,
} from "./QuizzAction";
import { apiUrl } from "../../constants";

export const getQuizz = async (dispatch) => {
  dispatch(getQuizzesStart());
  try {
    const res = await axios.get(`${apiUrl}quizzes/`);
    dispatch(getQuizzesSuccess(res.data));
  } catch (err) {
    dispatch(getQuizzesFailure());
  }
};

export const getQuizzByID = async (id, dispatch) => {
  dispatch(getQuizzesStart());
  try {
    const res = await axios.get(`${apiUrl}quizzes/?class_id=${id}`);
    dispatch(getQuizzesSuccess(res.data));
  } catch (err) {
    dispatch(getQuizzesFailure());
  }
};

export const deleteQuizz = async (id, dispatch) => {
  dispatch(deleteQuizzesStart());
  try {
    const res = await axios.delete(`${apiUrl}quizzes/${id}`);
    console.log(res.data);
    dispatch(deleteQuizzesSuccess(id));
  } catch (err) {
    dispatch(deleteQuizzesFailure());
  }
};

// export const createAssignment = async (data, dispatch) => {
//   dispatch(getAssignmentsStart());
//   try {
//     const res = await axios.post(`${apiUrl}assignments/create`, data);
//     console.log(res.data);
//     dispatch(getAssignmentsSuccess(res.data));
//   } catch (err) {
//     dispatch(getAssignmentsFailure());
//   }
// };
