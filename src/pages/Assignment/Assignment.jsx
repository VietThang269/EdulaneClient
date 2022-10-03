import { Button, message, Upload } from "antd";
import axios from "axios";
import JoditEditor from "jodit-react";
import React, { useEffect } from "react";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import moment from "moment";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { apiUrl } from "../../constants";
import "./Assignment.css";
import storage from "../../firebase";
import { InboxOutlined } from "@ant-design/icons";
import parse from "html-react-parser";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext/AuthContext";
import AssignmentResponse from "../../components/AssignmentResponse/AssignmentResponse";

function Assignment() {
  const { assId, classId } = useParams();
  const { user } = useContext(AuthContext);
  const [detail, setDetail] = useState({});
  const [value, setValue] = useState("");
  const [newUrl, setNewUrl] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [responseAss, setResponseAss] = useState([]);
  const [mark, setMark] = useState([]);
  const [course, setCourse] = useState();
  const [infoRes, setInfoRes] = useState(null);

  const history = useHistory();

  useEffect(() => {
    const getDetailCourse = async (id) => {
      const res = await axios.get(`${apiUrl}classes/get/${id}`);
      setCourse(res.data);
    };
    getDetailCourse(classId);
  }, [classId]);

  useEffect(() => {
    const getMarksAssignment = async (id) => {
      const res = await axios.get(
        `${apiUrl}assignment_responses/?user_id=${id}`
      );
      console.log("user", res.data);
      setMark(res.data);
    };
    getMarksAssignment(user._id);
  }, [user._id]);

  useEffect(() => {
    const getResponseAssignment = async (assignmentId) => {
      const res = await axios.get(
        `${apiUrl}assignment_responses/?assignment_id=${assignmentId}`
      );
      setResponseAss(res.data);
    };
    getResponseAssignment(assId);
  }, [assId]);

  useEffect(() => {
    const getDetailAssignment = async (assignmentId) => {
      const res = await axios.get(`${apiUrl}assignments/${assignmentId}`);
      setDetail(res.data);
    };
    getDetailAssignment(assId);
  }, [assId]);

  useEffect(() => {
    const getResponseAss = async () => {
      const res = await axios.get(
        `${apiUrl}assignment_responses/find/${user._id}/${assId}`
      );
      setInfoRes(res.data);
    };
    getResponseAss();
  }, [user._id, assId]);

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

  const handleSubmit = async () => {
    const currentDate = moment().format("DD-MM-YYYY HH:mm A");
    const res = await axios.post(`${apiUrl}assignment_responses/create`, {
      rawText: value,
      assignmentFileUrl: newUrl,
      user_id: user._id,
      assignment_id: assId,
      updateAt: currentDate,
    });
    if (res.data) {
      message.success("Nộp bài thành công !!!");
      setValue("");
      setFileList([]);
      setNewUrl([]);
      history.push(`/courses/${detail.class_id}`);
    }
  };

  const handleSubmitAgain = async () => {
    // console.log(currentDate);
    const res = await axios.post(`${apiUrl}assignment_responses/create`, {
      rawText: value,
      assignmentFileUrl: newUrl,
      user_id: user._id,
      assignment_id: assId,
      // updateAt: currentDate,
    });
    // if (res.data) {
    //   message.success("Nộp bài thành công !!!");
    //   setValue("");
    //   setFileList([]);
    //   setNewUrl([]);
    //   history.push(`/courses/${detail.class_id}`);
    // }
  };
  // console.log("info", infoRes);

  return (
    <div className="assignment_page">
      <div className="assignment_page-left">
        <div className="assignment_page-info">
          <p className="title_p">{detail.title || ""}</p>
          <p className="title_p">{detail.name || ""}</p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          <div className="assignment_page-instruction">
            <p className="title_p" style={{ marginBottom: 5 }}>
              Hướng dẫn
            </p>

            {detail.instruction !== undefined && parse(detail.instruction)}
          </div>
          {!user.isTeacher && (
            <div className="assignment_page-mark">
              <p className="title_p" style={{ marginBottom: 5 }}>
                Điểm
              </p>
              <p>{infoRes?.marks || "Chưa chấm điểm"}</p>
            </div>
          )}
          {!user.isTeacher && (
            <div className="assignment_page_upload">
              <div>
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
                    const uploadTask = uploadBytesResumable(
                      storageRef,
                      data.file
                    );

                    uploadTask.on(
                      "state_changed",
                      (snapshot) => {
                        const progress =
                          (snapshot.bytesTransferred / snapshot.totalBytes) *
                          100;
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
                  <p className="ant-upload-text">
                    Kéo thả tệp mà bạn muốn tải lên
                  </p>
                  <p className="ant-upload-hint">
                    Hỗ trợ tải một tệp hoặc nhiều tệp cùng lúc. Khuyến cáo không
                    nên tải tệp có tính bảo mật cao
                  </p>
                </Upload.Dragger>
              </div>
            </div>
          )}
        </div>
        {user.isTeacher && (
          <div
            className="assignment_page-response"
            style={{ marginTop: "2rem" }}
          >
            <p className="title_p" style={{ margin: 0 }}>
              Các bài đã nộp
            </p>
            <p>
              Đã nộp: {responseAss.length}/{course?.member.length}
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                marginTop: 20,
              }}
            >
              {responseAss.map(({ _id, user_id, updateAt }) => (
                <AssignmentResponse
                  dueDate={detail?.dueDate}
                  id={_id}
                  user_id={user_id}
                  updateAt={updateAt}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      {!user.isTeacher && (
        <div className="assignment_page-right">
          {Object.keys(infoRes ? infoRes : "").length === 0 ? (
            <Button type="primary" onClick={handleSubmit}>
              Nộp bài
            </Button>
          ) : (
            <Button type="primary" onClick={handleSubmitAgain}>
              Nộp lại bài
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default Assignment;
