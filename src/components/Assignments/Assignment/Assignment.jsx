import { Button } from "antd";
import React, { useEffect } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { AuthContext } from "../../../contexts/authContext/AuthContext";
import "./Assignment.css";
import axios from "axios";
import { apiUrl } from "../../../constants";
import { AssignmentContext } from "../../../contexts/assignmentContext/AssignmentContext";
import { deleteAssignment } from "../../../contexts/assignmentContext/apiCalls";
import { useState } from "react";
// Status: Danger, Done, Late

function Assignment({
  id,
  title,
  instruction,
  startingDate,
  dueDate,
  name,
  isLoading3,
  setLoading3,
  detail,
  classId,
}) {
  var type = "";
  const { user } = useContext(AuthContext);
  const { dispatch } = useContext(AssignmentContext);
  const [response, setResponse] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const getResponseAss = async () => {
      const res = await axios.get(
        `${apiUrl}assignment_responses/find/${user?._id}/${id}`
      );
      setResponse(res.data);
      setLoading(false);
    };
    getResponseAss();
  }, [user?._id, id]);

  const dateCurrent = moment();
  const startingDateObject = moment(startingDate, "DD-MM-YYYY HH:mm A");
  const dueDateObject = moment(dueDate, "DD-MM-YYYY HH:mm A");

  const date1 = moment(dueDate, "DD-MM-YYYY HH:mm A");
  var time;
  var diff;
  var d;
  var h;
  var m;
  var s;
  var checkTime;
  if (!isLoading) {
    const date2 = moment(response.updateAt, "DD-MM-YYYY HH:mm A");
    diff = date1.diff(date2, "seconds");
    d = Math.floor(diff / (3600 * 24));
    h = Math.floor((diff % (3600 * 24)) / 3600);
    m = Math.floor((diff % 3600) / 60);
    s = Math.floor(diff % 60);
    checkTime = false;
  }

  if (d < 0 || h < 0 || m < 0 || s < 0) {
    checkTime = true;
  } else checkTime = false;

  dueDateObject > dateCurrent ? (type = "green") : (type = "red");
  if (user.isTeacher) type = "green";
  if (
    Object.keys(response ? response : "").length !== 0 &&
    checkTime == false
  ) {
    type = "green";
  }

  const handleDelete = () => {
    deleteAssignment(id, dispatch);
    setLoading3(!isLoading3);
  };

  return (
    <div className="assignment" style={{ border: `1px solid var(--${type})` }}>
      <div className="assignment-title">
        <div
          className="dot"
          style={{ backgroundColor: `var(--${type})` }}
        ></div>
        <div className="title-content">
          <Link to={`/assignment/${id}`}>
            <a className="title-content-class">{title}</a>
          </Link>
          <p
            style={{
              color: "rgba(0, 0, 0, 0.45)",
              fontSize: 13,
            }}
          >
            {detail?.section}
          </p>
          <p className="title-content-chap">{name}</p>
        </div>
      </div>
      <div className="assignment-time" style={{ display: "flex", gap: 10 }}>
        <p className="time-hour" style={{ margin: 0, textAlign: "center" }}>
          {startingDate?.split(" ")[1]} {startingDate?.split(" ")[2]} -{" "}
          {dueDate?.split(" ")[1]} {dueDate?.split(" ")[2]}
          <br />
          {startingDate?.split(" ")[0]} - {dueDate?.split(" ")[0]}
        </p>
      </div>
      {!user.isTeacher && (
        <div className="assignment-deadline">
          {Object.keys(response ? response : "").length === 0 ? (
            <p
              className="title-deadline"
              style={{ color: `var(--${type})`, margin: 0 }}
            >
              {type === "green" && "Chưa nộp"}
              {(type === "red" || checkTime) && "Muộn"}
            </p>
          ) : (
            <p className="title-deadline" style={{ margin: 0 }}>
              {!checkTime ? "Đã nộp" : "Nộp muộn"}
            </p>
          )}
        </div>
      )}
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
        }}
      >
        <Link to={`/assignment/${detail?._id || classId}/${id}`}>
          <Button type="primary">Truy cập</Button>
        </Link>
        {user.isTeacher && (
          <Button type="danger" onClick={handleDelete}>
            Xóa
          </Button>
        )}
      </div>
    </div>
  );
}

export default Assignment;
