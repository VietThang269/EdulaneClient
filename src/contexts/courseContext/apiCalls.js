import axios from "axios";
import {
  getCoursesFailure,
  getCoursesStart,
  getCoursesSuccess,
  joinCoursesFailure,
  joinCoursesStart,
  joinCoursesSuccess,
} from "./CourseAction.js";
import { apiUrl } from "../../constants";

export const getCourses = async (id, dispatch) => {
  dispatch(getCoursesStart());
  try {
    const res = await axios.get(`${apiUrl}classes/${id}`);
    dispatch(getCoursesSuccess(res.data));
  } catch (err) {
    dispatch(getCoursesFailure());
  }
};

export const getCoursesAdmin = async (id, dispatch) => {
  dispatch(getCoursesStart());
  try {
    console.log(id);
    const res = await axios.get(`${apiUrl}classes/getAdmin/${id}`);
    console.log(res);
    dispatch(getCoursesSuccess(res.data));
  } catch (err) {
    dispatch(getCoursesFailure());
  }
};

export const joinClasses = async (value, dispatch) => {
  dispatch(joinCoursesStart());
  try {
    const res = await axios.put(`${apiUrl}classes/join`, value);
    if (res.data) dispatch(joinCoursesSuccess(res.data));
    else {
      dispatch(joinCoursesFailure());
      return;
    }
  } catch (err) {
    dispatch(joinCoursesFailure());
  }
};

export const createClasses = async (value, dispatch) => {
  dispatch(joinCoursesStart());
  try {
    const res = await axios.post(`${apiUrl}classes/create`, value);
    if (res.data) dispatch(joinCoursesSuccess(res.data));
    else return;
  } catch (err) {
    dispatch(joinCoursesFailure());
  }
};
