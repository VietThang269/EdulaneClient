import React, { useEffect, useState } from "react";
import "./TopBar.css";
import logo from "../../assets/img/logo-01.png";
import { Button, Form, Input, Modal, Popover } from "antd";
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
  const [form] = Form.useForm();

  const [isLoading, setLoading] = useState(true);
  const { dispatch } = useContext(AuthContext);
  const history = useHistory();
  const [open, setOpen] = useState(false);

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

  const onFinish = async (values) => {
    const res = await axios.put(`${apiUrl}users/update_password/${user?._id}`, {
      password: values.password,
    });
    if (res) logOut(dispatch);
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
              zIndex={999}
              placement="bottom"
              title="Thiết lập"
              content={
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  <Button
                    style={{ width: "100%" }}
                    onClick={(e) => setOpen(true)}
                  >
                    Đổi mật khẩu
                  </Button>
                  <Modal
                    visible={open}
                    title="Đổi mật khẩu"
                    onCancel={(e) => setOpen(false)}
                    footer={
                      <div>
                        {/* <Button onClick={(e) => setOpen(false)}>Đóng</Button>
                        <Button type="primary" htmlType="submit">
                          Xác nhận
                        </Button> */}
                      </div>
                    }
                  >
                    <Form
                      name="basic"
                      form={form}
                      initialValues={{
                        remember: true,
                      }}
                      onFinish={onFinish}
                      // onFinishFailed={onFinishFailed}
                      autoComplete="off"
                    >
                      <Form.Item
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: "Hãy điền mật khẩu mới !",
                          },
                        ]}
                      >
                        <Input.Password
                          placeholder="Mật khẩu mới"
                          // style={{ width: "100%" }}
                        />
                      </Form.Item>
                      <Form.Item
                        name="confirm"
                        dependencies={["password"]}
                        hasFeedback
                        rules={[
                          {
                            required: true,
                            message: "Hãy xác nhận mật khẩu",
                          },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (
                                !value ||
                                getFieldValue("password") === value
                              ) {
                                return Promise.resolve();
                              }

                              return Promise.reject(
                                new Error(
                                  "Mật khẩu và Xác nhận mật khẩu phải trùng khớp"
                                )
                              );
                            },
                          }),
                        ]}
                      >
                        <Input.Password placeholder="Xác nhận mật khẩu" />
                      </Form.Item>
                      <Form.Item>
                        <div
                          style={{
                            display: "flex",
                            gap: "1rem",
                          }}
                        >
                          <Button
                            onClick={(e) => {
                              form.resetFields();
                              setOpen(false);
                            }}
                          >
                            Đóng
                          </Button>
                          <Button type="primary" htmlType="submit">
                            Xác nhận
                          </Button>
                        </div>
                      </Form.Item>
                    </Form>
                  </Modal>
                  <Button style={{ width: "100%" }} onClick={logout}>
                    Logout
                  </Button>
                </div>
              }
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
