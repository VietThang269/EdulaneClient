import { Avatar } from "antd";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiUrl } from "../../constants";
import "./User.css";

function User() {
  const { userId } = useParams();
  const [data, setData] = useState();
  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(`${apiUrl}users/${userId}`);
      setData(res.data);
    };
    getUser();
  }, [userId]);
  return (
    <div className="user">
      <div className="user_container">
        <div className="user_top">
          <div className="user_img">
            <Avatar
              style={{
                color: "#f56a00",
                backgroundColor: "#fde3cf",
                width: "100px",
                height: "100px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                // transform: "scale(2.2)",
              }}
            >
              <p style={{ fontSize: 14, margin: 0 }}>{data?.universityId}</p>
            </Avatar>
          </div>
          <div className="user_name">
            <p className="user_title">{data?.fullName}</p>
            {/* <p className="user_decs">
              {data?.isTeacher ? "Giảng viên" : "Sinh viên"}
            </p> */}
          </div>
        </div>
        <div className="user_down">
          <p>
            <span style={{ fontWeight: "bold" }}> Chức vụ: </span>
            {data?.isTeacher ? " Giảng viên" : " Sinh viên"}
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>
              Mã
              {data?.isTeacher ? " Giảng viên" : " Sinh viên"}:
            </span>{" "}
            {data?.universityId}
          </p>
        </div>
      </div>
    </div>
  );
}

export default User;
