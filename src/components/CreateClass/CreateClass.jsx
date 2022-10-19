import { Button, Col, DatePicker, Form, Input, Modal, Row, Select } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/authContext/AuthContext";
import { CourseContext } from "../../contexts/courseContext/CourseContext";
import "./CreateClass.css";
import { createClasses } from "../../contexts/courseContext/apiCalls";

const { Option } = Select;

function CreateClass() {
  const [code, setCode] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const { courses, isFetching, error, dispatch } = useContext(CourseContext);
  const [className, setClassName] = useState("");
  const [section, setSection] = useState("");

  function makeid(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    console.log({ className, section, joinCode: makeid(5), userId: user._id });
    createClasses(
      { className, section, joinCode: makeid(5), userId: user._id },
      dispatch
    );
    setIsModalVisible(false);
    setClassName("");
    setSection("");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="createclass">
      <Button type="primary" onClick={showModal}>
        <PlusSquareOutlined /> Tạo lớp học mới
      </Button>
      <Modal
        title="Tạo lớp học mới"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={confirmLoading}
        okText="Tạo lớp"
        cancelText="Đóng"
      >
        <p style={{ marginBottom: 10 }}>Tên lớp</p>
        <Input
          style={{ borderRadius: 0, marginBottom: 10 }}
          value={className}
          onChange={(e) => setClassName(e.target.value)}
        />
        <p style={{ marginBottom: 10 }}>Môn học</p>
        <Input
          style={{ borderRadius: 0 }}
          value={section}
          onChange={(e) => setSection(e.target.value)}
        />
      </Modal>
    </div>
  );
}

export default CreateClass;
