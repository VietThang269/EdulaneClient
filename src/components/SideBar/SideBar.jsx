import React from "react";
import { Menu } from "antd";
import {
  HomeOutlined,
  BookOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  FileTextOutlined,
  SnippetsOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./SideBar.css";

function SideBar() {
  return (
    <div className="sidebar">
      <div className="wrapper">
        <Menu
          selectedKeys={[]}
          mode="inline"
          style={{
            width: 300,
            fontWeight: 600,
            height: "100%",
          }}
        >
          <Menu.Item key={0}>
            <Link to="/home">
              <HomeOutlined style={{ fontSize: 18, marginRight: 15 }} /> Trang
              chủ
            </Link>
          </Menu.Item>

          <Menu.Item key={1}>
            <Link to="/courses">
              <BookOutlined style={{ fontSize: 18, marginRight: 15 }} />
              Khóa học của tôi
            </Link>
          </Menu.Item>

          <Menu.Item>
            <Link to="/calendars">
              <CalendarOutlined style={{ fontSize: 18, marginRight: 15 }} />
              Lịch
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/library">
              <AppstoreOutlined style={{ fontSize: 18, marginRight: 15 }} />
              Thư viện
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/exams">
              <FileTextOutlined style={{ fontSize: 18, marginRight: 15 }} />
              Kiểm tra
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/tasks">
              <SnippetsOutlined style={{ fontSize: 18, marginRight: 15 }} />
              Nhiệm vụ
            </Link>
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
}

export default SideBar;
