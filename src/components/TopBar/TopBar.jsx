import React, { useEffect, useState } from "react";
import "./TopBar.css";
import logo from "../../assets/img/logo-01.png";
import { Button, Input, Popover } from "antd";
import { BellOutlined, MailOutlined, DownOutlined } from "@ant-design/icons";
import { Avatar, Badge } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { AutoComplete } from "antd";
import axios from "axios";
import { apiUrl } from "../../constants";
import { logOut } from "../../contexts/authContext/apiCalls";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext/AuthContext";
import { Link, useHistory } from "react-router-dom";

function TopBar({ user }) {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const { dispatch } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(`${apiUrl}users/getall/${user._id}`);
      setLoading(false);
      setData(res.data);
    }
    fetchData();
  }, []);

  const renderItem = (title) => ({
    value: title.universityId,
    label: (
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
          {title.universityId}
        </Avatar>
        <div>
          <p style={{ margin: 0 }}>{title.fullName}</p>

          <p style={{ margin: 0, fontWeight: "bold" }}>{title.universityId}</p>
        </div>
      </div>
    ),
  });

  var x = [];
  var options = [];

  if (!isLoading) {
    data.map((value) => {
      x.push(renderItem(value));
    });

    options = x;
  }

  const logout = () => {
    logOut(dispatch);
  };

  const handleUser = () => {
    history.push(`/user/${user._id}`);
  };

  return (
    <div className="topbar">
      <div className="wrapper">
        <div className="topbar-left">
          <Link to="/home">
            <div className="topbar-logo">
              <img className="logo" src={logo} alt="" />
              <h1>
                <span>E</span>
                du
                <br />
                Lane
              </h1>
            </div>
          </Link>
        </div>
        <div className="topbar-mid">
          <p className="truncate">
            <span>Xin chào</span>, {user.fullName}
          </p>
          <AutoComplete
            dropdownClassName="certain-category-search-dropdown"
            dropdownMatchSelectWidth={500}
            style={{
              width: "60%",
            }}
            options={options}
            filterOption={(inputValue, option) =>
              option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
            }
          >
            <Input.Search
              size="large"
              placeholder="Tìm kiếm"
              style={{ width: "100%" }}
            />
          </AutoComplete>
        </div>
        <div className="topbar-right">
          <Badge dot>
            <BellOutlined
              style={{
                fontSize: "20px",
              }}
            />
          </Badge>
          <Badge dot>
            <Link to="/chat">
              <MailOutlined
                style={{
                  fontSize: "20px",
                  color: "var(--main-color)",
                }}
              />
            </Link>
          </Badge>
          <div className="avatar">
            <Avatar
              style={{
                color: "#f56a00",
                backgroundColor: "#fde3cf",
                width: "35px",
                height: "35px",
                cursor: "pointer",
              }}
              onClick={handleUser}
            >
              {user.universityId}
            </Avatar>
            <div className="info">
              <p
                className="info-name"
                style={{
                  cursor: "pointer",
                }}
                onClick={handleUser}
              >
                {user.fullName}
              </p>
              <p className="info-position">
                {user.isTeacher ? "Giảng viên" : "Sinh viên"}
              </p>
            </div>
            <Popover
              placement="bottom"
              title="Thiết lập"
              content={<Button onClick={logout}>Logout</Button>}
              trigger="click"
            >
              <DownOutlined
                style={{
                  color: "var(--main-color)",
                }}
              />
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
