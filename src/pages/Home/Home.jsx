import React, { useContext } from "react";
import "./Home.css";
import UsersOnline from "../../components/UsersOnline/UsersOnline";
import Progresses from "../../components/Progresses/Progresses";
import Assignments from "../../components/Assignments/Assignments";
import Schedule from "../../components/Schedule/Schedule";
import Calendars from "../../components/Calendars/Calendars";
import Exams from "../Exams/Exams";
import { Link } from "react-router-dom";

function Home() {
  const isSplice = true;
  return (
    <div className="home">
      <div className="home-left">
        <div className="home-left-top">
          <UsersOnline />
          <Progresses />
        </div>
        <div className="home-left-bottom">
          <Link to="/exams">
            <p
              className="title_p"
              style={{
                fontSize: 14,
                position: "absolute",
                top: 10,
                left: 26,
              }}
            >
              Xem tất cả
            </p>
          </Link>
          <Exams cut={isSplice} />
        </div>
      </div>
      <div className="home-right">
        <Calendars />
        <Schedule />
      </div>
    </div>
  );
}

export default Home;
