import { Avatar } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiUrl } from "../../constants";
import "./QuizzResponse.css";

function QuizzResponse({ user_id, scores }) {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUser = async (userId) => {
      const res = await axios.get(`${apiUrl}users/${userId}`);
      setUser(res.data);
      setLoading(true);
    };
    getUser(user_id);
  }, [user_id]);

  return (
    <div className="quizz_response">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
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
        <p className="scores">Điểm: {scores}</p>
      </div>
    </div>
  );
}

export default QuizzResponse;
