import { Avatar } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiUrl } from "../../constants";
import "./Conversation.css";

function Conversation({ data, currentUser, online }) {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const userId = data.members.find((id) => id !== currentUser);
    const getUserData = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}users/${userId}`);
        setUserData(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    getUserData();
  }, []);
  return (
    <div className="conversation">
      <div className="avatar">
        <Avatar
          style={{
            color: "#f56a00",
            backgroundColor: "#fde3cf",
            width: "35px",
            height: "35px",
          }}
        >
          {userData?.universityId}
        </Avatar>
        <div className="info">
          <p className="info-name">{userData?.fullName}</p>
          <span style={{ color: online ? "#51e200" : "" }}>
            {online ? "Online" : "Offline"}
          </span>
        </div>
      </div>
      <hr style={{ width: "100%", border: "0.1px solid #ececec" }} />
    </div>
  );
}

export default Conversation;
