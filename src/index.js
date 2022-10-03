import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./contexts/authContext/AuthContext";
import { CourseContextProvider } from "./contexts/courseContext/CourseContext";
import { AssignmentContextProvider } from "./contexts/assignmentContext/AssignmentContext";
import { QuizzContextProvider } from "./contexts/quizzContext/QuizzContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <CourseContextProvider>
      <AssignmentContextProvider>
        <QuizzContextProvider>
          <App />
        </QuizzContextProvider>
      </AssignmentContextProvider>
    </CourseContextProvider>
  </AuthContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
