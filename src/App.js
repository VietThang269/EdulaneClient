import "./App.css";
import TopBar from "./components/TopBar/TopBar";
import Login from "./pages/Login/Login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import SideBar from "./components/SideBar/SideBar";
import Home from "./pages/Home/Home";
import Courses from "./pages/Courses/Courses";
import { useContext } from "react";
import { Spin } from "antd";
import { AuthContext } from "./contexts/authContext/AuthContext";
import CourseDetail from "./pages/CourseDetail/CourseDetail";
import Calendars from "./pages/Calendars/Calendars";
import Test from "./Test";
import CoursesAdmin from "./pagesAdmin/CoursesAdmin/CoursesAdmin";
import Register from "./pages/Register/Register";
import Assignment from "./pages/Assignment/Assignment";
import AssignmentResponse from "./pages/AssignmentResponse/AssignmentResponse";
import Quizz from "./pages/Quizz/Quizz";
import Chat from "./pages/Chat/Chat";
import Library from "./pages/Library/Library";
import Exams from "./pages/Exams/Exams";
import Tasks from "./pages/Tasks/Tasks";
import User from "./pages/User/User";

function App() {
  const { user, disptach } = useContext(AuthContext);

  return (
    <Router>
      <Switch>
        <Route path="/login">
          {user ? <Redirect to="/home" /> : <Login />}
        </Route>
        <Route path="/register">
          {user ? <Redirect to="/home" /> : <Register />}
        </Route>

        <Route exact path="/">
          {user ? <Redirect to="/home" /> : <Login />}
        </Route>

        {user !== null ? (
          user.isTeacher === false ? (
            <>
              <TopBar user={user} disptach={disptach} />
              <div className="container">
                <SideBar />
                <Switch>
                  <Route exact path="/home">
                    <Home user={user} />
                  </Route>
                  <Route exact path="/courses">
                    <Courses />
                  </Route>
                  <Route exact path="/courses/:id">
                    <CourseDetail />
                  </Route>
                  <Route exact path="/calendars">
                    <Calendars />
                  </Route>
                  <Route exact path="/assignment/:classId/:assId">
                    <Assignment />
                  </Route>
                  <Route exact path="/assignment_response/:assResId">
                    <AssignmentResponse />
                  </Route>
                  <Route exact path="/quizz/:quiId">
                    <Quizz />
                  </Route>
                  <Route exact path="/chat">
                    <Chat />
                  </Route>
                  <Route exact path="/library">
                    <Library />
                  </Route>
                  <Route exact path="/exams">
                    <Tasks />
                  </Route>
                  <Route exact path="/tasks">
                    <Exams />
                  </Route>
                  <Route exact path="/user/:userId">
                    <User />
                  </Route>
                </Switch>
              </div>
            </>
          ) : (
            <>
              <TopBar user={user} />
              <div className="container">
                <SideBar user={user} />
                <Switch>
                  <Route exact path="/home">
                    <Home user={user} />
                  </Route>
                  <Route exact path="/courses">
                    <CoursesAdmin />
                  </Route>
                  <Route exact path="/courses/:id">
                    <CourseDetail />
                  </Route>
                  <Route exact path="/calendars">
                    <Calendars />
                  </Route>
                  <Route exact path="/assignment/:classId/:assId">
                    <Assignment />
                  </Route>
                  <Route exact path="/assignment_response/:assResId">
                    <AssignmentResponse />
                  </Route>
                  <Route exact path="/quizz/:quiId">
                    <Quizz />
                  </Route>
                  <Route exact path="/chat">
                    <Chat />
                  </Route>
                  <Route exact path="/library">
                    <Library />
                  </Route>
                  <Route exact path="/exams">
                    <Tasks />
                  </Route>
                  <Route exact path="/tasks">
                    <Exams />
                  </Route>
                  <Route exact path="/user/:userId">
                    <User />
                  </Route>
                </Switch>
              </div>
            </>
          )
        ) : (
          <Redirect to="/login" />
        )}
      </Switch>
    </Router>
  );
}

export default App;
