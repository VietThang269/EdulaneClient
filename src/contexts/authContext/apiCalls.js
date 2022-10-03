import axios from "axios";
import { apiUrl } from "../../constants";
import {
  loginFailure,
  loginStart,
  loginSuccess,
  logout,
  registerFailure,
  registerStart,
  registerSuccess,
} from "./AuthAction";

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export const login = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(`${apiUrl}users/signin`, user);
    console.log("res", res);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    console.log("err", err);
    dispatch(loginFailure());
  }
};

export const register = async (user, dispatch) => {
  dispatch(registerStart());
  try {
    const res = await axios.post(`${apiUrl}users/signup`, user);
    // Fake data
    if (res) {
      if (res?.data?.isTeacher) {
        const res1 = await axios.post(`${apiUrl}classes/create`, {
          className: "Lớp học đầu tiên của bạn",
          section: "Học ReactJs cơ bản",
          userId: res?.data?._id,
          joinCode: makeid(5),
        });
      } else {
        const res2 = await axios.put(`${apiUrl}classes/add`, {
          user: [res?.data?._id],
          classId: "633afdacc19fc370b1774c32",
        });
      }
    }
    dispatch(registerSuccess(res.data));
  } catch (err) {
    dispatch(registerFailure());
  }
};

// export const createClasses = async (value, dispatch) => {
//   dispatch(joinCoursesStart());
//   try {
//     const res = await axios.post(`${apiUrl}classes/create`, value);
//     if (res.data) dispatch(joinCoursesSuccess(res.data));
//     else return;
//   } catch (err) {
//     dispatch(joinCoursesFailure());
//   }
// };

export const logOut = async (dispatch) => {
  dispatch(logout());
  localStorage.removeItem("user");
};
