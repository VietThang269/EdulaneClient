import { InboxOutlined, PlusSquareOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Input,
  message,
  Modal,
  Select,
  Upload,
} from "antd";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import JoditEditor from "jodit-react";
import React, { useState } from "react";
import storage from "../../firebase";
import "./CreateAssignment.css";
import moment from "moment";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext/AuthContext";
import { AssignmentContext } from "../../contexts/assignmentContext/AssignmentContext";
import { createAssignment } from "../../contexts/assignmentContext/apiCalls";
import axios from "axios";
import { apiUrl } from "../../constants";

const { RangePicker } = DatePicker;
const { Option } = Select;

function CreateAssignment({ classId, isLoading3, setLoading3 }) {
  const [value, setValue] = useState("");
  const [newUrl, setNewUrl] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [title, setTitle] = useState();
  const [point, setPoint] = useState();

  const { user } = useContext(AuthContext);
  const { dispatch } = useContext(AssignmentContext);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    const res = await axios.post(`${apiUrl}assignments/create`, {
      title: title,
      instruction: value,
      assignmentMarks: point,
      assignmentFileUrl: newUrl,
      startingDate: startDate,
      dueDate: endDate,
      author_id: user._id,
      class_id: classId,
    });
    console.log({
      title: title,
      assignmentMarks: point,
      assignmentFileUrl: newUrl,
      startingDate: startDate,
      dueDate: endDate,
      author_id: user._id,
      class_id: classId,
    });
    setIsModalVisible(false);
    setLoading3(!isLoading3);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const deleteItem = (item) => {
    const storageRef = ref(storage, `/items/${item.name}`);
    setNewUrl((prev) => prev.filter((data) => data.name !== item.name));
    console.log("newUrl", newUrl);

    deleteObject(storageRef)
      .then(() => {
        message.success(`Xóa thành công !`);
        console.log("Success");
      })
      .catch((error) => {
        console.log("Error");
      });
  };

  const onChange = (value, dateString) => {
    console.log("value", value);
    setStartDate(dateString[0]);
    setEndDate(dateString[1]);
  };

  const handleChange = (value) => {
    setPoint(value);
  };

  return (
    <div className="create_assignment">
      <Button type="primary" onClick={showModal}>
        <PlusSquareOutlined /> Tạo Assignment mới
      </Button>
      <Modal
        title="Tạo Assignment mới"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={confirmLoading}
        width={1000}
        style={{
          top: 20,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "1rem",
            fontWeight: "bold",
          }}
        >
          <div
            style={{
              flex: "3",
              width: "80%",
              fontWeight: "bold",
            }}
          >
            <p>Tên Assignment</p>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div
            style={{
              flex: "1",
            }}
          >
            <p>Điểm tối đa</p>
            <Select
              defaultValue="1"
              style={{
                width: 120,
              }}
              onChange={handleChange}
            >
              <Option value="1">1</Option>
              <Option value="2">2</Option>
              <Option value="3">3</Option>
              <Option value="4">4</Option>
              <Option value="5">5</Option>
              <Option value="6">6</Option>
              <Option value="7">7</Option>
              <Option value="8">8</Option>
              <Option value="9">9</Option>
              <Option value="10">10</Option>
            </Select>
          </div>
        </div>
        <div
          style={{
            marginTop: "1rem",
          }}
        >
          <p
            style={{
              fontWeight: "bold",
            }}
          >
            Thời gian
          </p>
          <RangePicker
            showTime={{ format: "HH:mm" }}
            format="DD-MM-YYYY HH:mm A"
            placeholder={["Thời gian bắt đầu", "Thời gian kết thúc"]}
            onChange={onChange}
          />
        </div>

        <div className="create_assignment-modal">
          <div>
            <p style={{ fontWeight: "bold" }}>Hướng dẫn</p>
            <JoditEditor
              value={value}
              onChange={(newContent) => setValue(newContent)}
              style={{ width: "100%" }}
            />
          </div>

          <div>
            <Upload.Dragger
              name="file"
              fileList={fileList}
              multiple
              onChange={(data) => {
                setFileList(data.fileList);
              }}
              onRemove={(data) => {
                console.log(data);
                deleteItem(data);
              }}
              customRequest={(data) => {
                const storageRef = ref(storage, `/items/${data.file.name}`);
                const uploadTask = uploadBytesResumable(storageRef, data.file);

                uploadTask.on(
                  "state_changed",
                  (snapshot) => {
                    const progress =
                      (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    data.onProgress({ progress: progress }, data.file);
                  },
                  (error) => {
                    message.error(`Không thành công !`);
                  },
                  () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                      if (url) {
                        setNewUrl((prev) => [
                          ...prev,
                          {
                            name: data.file.name,
                            url: url,
                            type: data.file.type,
                          },
                        ]);
                        console.log(url);
                        data.onSuccess(data.file);
                        message.success(
                          `${data.file.name} đã upload thành công`
                        );
                      }
                    });
                  }
                );
              }}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Kéo thả tệp mà bạn muốn tải lên</p>
              <p className="ant-upload-hint">
                Hỗ trợ tải một tệp hoặc nhiều tệp cùng lúc. Khuyến cáo không nên
                tải tệp có tính bảo mật cao
              </p>
            </Upload.Dragger>
          </div>
        </div>
        {/* <p>Tên lớp</p>
    <Input
      style={{ borderRadius: 0, marginBottom: 10 }}
      value={className}
      onChange={(e) => setClassName(e.target.value)}
    />
    <p>Môn học</p>
    <Input
      style={{ borderRadius: 0 }}
      value={section}
      onChange={(e) => setSection(e.target.value)}
    /> */}
      </Modal>
    </div>
  );
}

export default CreateAssignment;
