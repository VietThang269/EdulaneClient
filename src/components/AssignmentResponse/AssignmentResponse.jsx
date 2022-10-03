import { Avatar, Button } from "antd";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { apiUrl } from "../../constants";
import moment from "moment";
import "./AssignmentResponse.css";

function AssignmentResponse({ id, user_id, updateAt, dueDate }) {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  console.log("up", updateAt);
  console.log("due", dueDate);

  const date1 = moment(dueDate, "DD-MM-YYYY HH:mm A");
  const date2 = moment(updateAt, "DD-MM-YYYY HH:mm A");

  console.log("date1", date1);
  console.log("date2", date2);
  var diff = date1.diff(date2, "seconds");

  const diffAbs = Math.abs(diff);

  var d = Math.floor(diffAbs / (3600 * 24));
  var h = Math.floor((diffAbs % (3600 * 24)) / 3600);
  var m = Math.floor((diffAbs % 3600) / 60);
  var s = Math.floor(diffAbs % 60);
  var strDate;
  var checkTime = false;
  var color = "";
  if (diff < 0) {
    checkTime = true;
    strDate =
      "Nộp muộn " +
      Math.abs(d) +
      " ngày " +
      Math.abs(h) +
      " giờ " +
      Math.abs(m) +
      " phút " +
      Math.abs(s) +
      " giây ";
  } else {
    checkTime = false;
    strDate =
      "Nộp sớm " +
      Math.abs(d) +
      " ngày " +
      Math.abs(h) +
      " giờ " +
      Math.abs(m) +
      " phút " +
      Math.abs(s) +
      " giây ";
  }

  !checkTime ? (color = "green") : (color = "red");

  useEffect(() => {
    const getUser = async (userId) => {
      const res = await axios.get(`${apiUrl}users/${userId}`);
      setUser(res.data);
      setLoading(true);
    };
    getUser(user_id);
  }, [user_id]);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        border: `1px solid var(--${color})`,
        padding: "2%",
        borderRadius: 5,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          justifyContent: "space-between",
        }}
      >
        <Avatar
          style={{
            color: "#f56a00",
            backgroundColor: "#fde3cf",
            width: "35px",
            height: "35px",
          }}
        >
          {loading && user.universityId}
        </Avatar>
        <div>
          <p style={{ margin: 0 }}>{loading && user.fullName}</p>
          <p style={{ margin: 0, fontWeight: "bold" }}>
            {loading && user.universityId}
          </p>
        </div>
      </div>
      <div>
        <p style={{ margin: 0 }}>{strDate}</p>
      </div>
      <Link to={`/assignment_response/${id}`}>
        <Button type="primary">Xem</Button>
      </Link>
    </div>
  );
}

export default AssignmentResponse;
