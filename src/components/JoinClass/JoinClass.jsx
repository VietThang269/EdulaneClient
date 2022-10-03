import { Button, Input, message, Modal } from "antd";
import React, { useContext, useState } from "react";
import "./JoinClass.css";

import { PlusSquareOutlined } from "@ant-design/icons";
import { AuthContext } from "../../contexts/authContext/AuthContext";
import { CourseContext } from "../../contexts/courseContext/CourseContext";
import { joinClasses } from "../../contexts/courseContext/apiCalls";

function JoinClass() {
  const [code, setCode] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const { courses, isFetching, error, dispatch } = useContext(CourseContext);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    const id = user._id;
    joinClasses({ userId: id, joinCode: code }, dispatch);

    if (error) {
      message.error("Không tồn tại !!!");
    } else {
      setIsModalVisible(false);
      setCode("");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div className="joinclass">
      <Button type="primary" onClick={showModal}>
        <PlusSquareOutlined /> Vào lớp bằng JoinCode
      </Button>
      <Modal
        title="Vào lớp bằng JoinCode"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={confirmLoading}
      >
        <Input
          placeholder="JoinCode..."
          style={{ borderRadius: 0 }}
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </Modal>
    </div>
  );
}

export default JoinClass;
