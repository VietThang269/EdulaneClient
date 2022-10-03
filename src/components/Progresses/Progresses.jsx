import { Avatar, Divider, List, Skeleton, Progress } from "antd";
import React, { useContext, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { MessageOutlined } from "@ant-design/icons";
import "./Progresses.css";
import axios from "axios";
import { apiUrl } from "../../constants";
import { AuthContext } from "../../contexts/authContext/AuthContext";
import { Link } from "react-router-dom";

function Progresses() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { user } = useContext(AuthContext);

  // const loadMoreData = () => {
  //   if (loading) {
  //     return;
  //   }

  //   setLoading(true);
  //   fetch(
  //     "https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo"
  //   )
  //     .then((res) => res.json())
  //     .then((body) => {
  //       setData([...data, ...body.results]);
  //       setLoading(false);
  //       console.log(data);
  //     })
  //     .catch(() => {
  //       setLoading(false);
  //     });
  // };

  const loadMoreData = () => {
    if (loading) {
      return;
    }

    setLoading(true);
    if (!user.isTeacher)
      axios.get(`${apiUrl}classes/${user._id}`).then((res) => {
        setData([...data, ...res.data]);
        console.log(data);
        setLoading(false);
      });
    else {
      axios.get(`${apiUrl}classes/getAdmin/${user._id}`).then((res) => {
        setData([...data, ...res.data]);
        console.log(data);
        setLoading(false);
      });
    }
  };

  data?.splice(4);

  useEffect(() => {
    loadMoreData();
  }, []);
  return (
    <div className="progresses">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <p className="title">Khóa học của tôi</p>
        <Link to="/courses">
          <p
            className="title_p"
            style={{
              margin: 0,
              fontSize: 14,
              marginBottom: 10,
            }}
          >
            Xem tất cả
          </p>
        </Link>
      </div>
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
              <List.Item key={item.className}>
                <List.Item.Meta
                  title={
                    <Link to={`/courses/${item._id}`}>{item.className}</Link>
                  }
                  description={item.section}
                />
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default Progresses;
