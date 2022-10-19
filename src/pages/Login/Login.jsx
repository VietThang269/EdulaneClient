import React, { useContext } from "react";
import "./Login.css";
import { Button, Checkbox, Form, message } from "antd";
import logo from "../../assets/img/logo-01.png";
import people from "../../assets/img/people_class-01.png";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LeftOutlined,
} from "@ant-design/icons";
import { Input } from "antd";
import { useState } from "react";
import { AuthContext } from "../../contexts/authContext/AuthContext";
import { login } from "../../contexts/authContext/apiCalls";
import { Link } from "react-router-dom";

function Login() {
  const { user, isFetching, dispatch, error } = useContext(AuthContext);

  const onFinish = (values) => {
    login(values, dispatch);
  };

  if (error) {
    message.error("Sai tài khoản hoặc mật khẩu !");
  }

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login">
      <div className="wrapper">
        <div className="login-left">
          <div className="login-student">
            <div className="login-logo">
              <img className="logo" src={logo} alt="" />
              <h1>
                <span>E</span>
                du
                <br />
                Lane
              </h1>
            </div>
            <Form
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                name="userName"
                rules={[
                  {
                    required: true,
                    message: "Hãy điền tên đăng nhập !",
                  },
                ]}
              >
                <Input placeholder="Tài khoản" />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Hãy điền mật khẩu !",
                  },
                ]}
              >
                <Input.Password placeholder="Mật khẩu" />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                >
                  Đăng nhập
                </Button>
              </Form.Item>
            </Form>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <p style={{ margin: 0 }}>
                Chưa có tài khoản?{" "}
                <Link to="/register">
                  <a href="#">Đăng ký ngay</a>
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="login-right">
          <img className="people" src={people} alt="" />
          <svg
            className="wave"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
          >
            <path
              fill="#fff"
              fill-opacity="1"
              d="M0,128L26.7,122.7C53.3,117,107,107,160,133.3C213.3,160,267,224,320,234.7C373.3,245,427,203,480,154.7C533.3,107,587,53,640,64C693.3,75,747,149,800,160C853.3,171,907,117,960,128C1013.3,139,1067,213,1120,245.3C1173.3,277,1227,267,1280,250.7C1333.3,235,1387,213,1413,202.7L1440,192L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Login;
