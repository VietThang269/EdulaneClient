import { Avatar, Divider, List, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "./UsersOnline.css";
import { MessageOutlined } from "@ant-design/icons";
import { apiUrl } from "../../constants";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext/AuthContext";

function UsersOnline() {
  const history = useHistory();

  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const loadMoreData = () => {
    if (loading) {
      return;
    }

    setLoading(true);
    axios.get(`${apiUrl}users/`).then((res) => {
      const dataItem = res.data.filter((item) => item._id !== user?._id);
      setData(dataItem);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  const handleChat = async (value) => {
    const res = await axios.post(`${apiUrl}chat/`, {
      senderId: user._id,
      receiverId: value,
    });

    if (res) {
      history.push("/chat");
    }
  };

  return (
    <div className="user_online">
      <p className="title">Người dùng khác</p>
      <div
        id="scrollableDiv"
        style={{
          height: 300,
          overflow: "auto",
          padding: "0 16px",
        }}
      >
        <InfiniteScroll dataLength={data.length}>
          <List
            dataSource={data}
            renderItem={(item) => (
              <List.Item key={item.userName}>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      style={{
                        color: "#f56a00",
                        backgroundColor: "#fde3cf",
                        width: "35px",
                        height: "35px",
                      }}
                    >
                      {item.universityId}
                    </Avatar>
                  }
                  title={<Link to={`/user/${item._id}`}>{item.userName}</Link>}
                  description={item.universityId}
                />
                <p
                  onClick={(e) => handleChat(item._id)}
                  style={{ cursor: "pointer" }}
                >
                  <MessageOutlined style={{ fontSize: 20 }} />
                </p>
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default UsersOnline;
