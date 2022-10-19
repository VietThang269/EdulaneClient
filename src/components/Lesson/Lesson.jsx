import React, { useState } from "react";
import "./Lesson.css";
import parse from "html-react-parser";
import {
  Avatar,
  Spin,
  Button,
  Comment,
  Form,
  Input,
  List,
  message,
  Popover,
  Popconfirm,
} from "antd";
import { useEffect } from "react";
import { apiUrl } from "../../constants";
import axios from "axios";
import moment from "moment";
import {
  FileExcelFilled,
  FileImageFilled,
  FileOutlined,
  FilePdfFilled,
  FilePdfOutlined,
  FilePptFilled,
  FileWordFilled,
  MoreOutlined,
} from "@ant-design/icons";

const { TextArea } = Input;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${
      comments.length > 1 ? "Nhận xét" : "Nhận xét"
    }`}
    itemLayout="horizontal"
    renderItem={(props) => <Comment {...props} />}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea
        style={{ resize: "none" }}
        rows={4}
        onChange={onChange}
        value={value}
      />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Thêm nhận xét
      </Button>
    </Form.Item>
  </>
);
function Lesson({
  rawText,
  classId,
  attachedFileUrls,
  isLoading,
  createdAt,
  userId,
  user,
  contentId,
  setLoading,
  isLoadingreal,
}) {
  const [teacher, setTeacher] = useState();
  const [comments, setComments] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState("");
  const [comment, setComment] = useState({
    comment: "",
    classId: "",
    contentId: "",
    userId: "",
  });
  const [loadingComment, setLoadingComment] = useState(false);

  var todayDateFormat = moment(createdAt).format("DD-MM-YYYY HH:mm A");

  const handleChange = (e) => {
    setValue(e.target.value);
    setComment({
      comment: e.target.value,
      clsId: classId,
      contentId: contentId,
      userId: user._id,
    });
  };

  useEffect(() => {
    const getTeacher = async () => {
      const res = await axios.get(`${apiUrl}users/${userId}`);
      setTeacher(res.data);
    };
    getTeacher();
  }, []);

  const handleSubmit = async () => {
    const res = await axios.post(`${apiUrl}comments/create`, comment);
    setLoadingComment(!loadingComment);
    setValue("");
  };

  useEffect(() => {
    const getComments = async () => {
      const res = await axios.get(`${apiUrl}comments/${contentId}`);
      setComments(res.data);
      const test = res.data.map((item) => {
        const time = moment(item.createdAt).format("DD-MM-YYYY HH:mm");
        return {
          author: `${item.fullName}`,
          avatar: (
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
          ),
          content: <p>{item.comment}</p>,
          datetime: `${time}`,
        };
      });

      setComments(test);
    };
    getComments();
  }, [loadingComment]);

  const handleDeleteLesson = async () => {
    const res = await axios.delete(`${apiUrl}class_contents/${contentId}`);
    setLoading(!isLoadingreal);
  };

  return !isLoading && teacher ? (
    <div className="lesson">
      <div className="lesson_avatar">
        <Avatar
          style={{
            color: "#f56a00",
            backgroundColor: "#fde3cf",
            width: "35px",
            height: "35px",
          }}
        >
          {teacher.universityId}
        </Avatar>
        <div className="info">
          <p style={{ fontWeight: "600" }}> {teacher.fullName}</p>
          <p
            style={{
              color: "rgba(0, 0, 0, 0.45)",
              fontSize: 14,
              lineHeight: 1.5715,
            }}
          >
            {todayDateFormat}
          </p>
        </div>
      </div>
      {user?.isTeacher && (
        <div className="lesson_option">
          <Popover
            trigger="click"
            placement="bottom"
            content={
              <Popconfirm
                title="Bạn có chắc muốn xóa bài học này không ?"
                onConfirm={handleDeleteLesson}
                okText="Có"
                cancelText="Không"
              >
                <p style={{ margin: 0, cursor: "pointer" }}>Xóa</p>
              </Popconfirm>
            }
          >
            <MoreOutlined
              style={{
                color: "black",
                fontSize: 30,
              }}
            />
          </Popover>
        </div>
      )}
      <div className="lesson_content">
        {parse(rawText)}
        <div className="lesson_content-file">
          {attachedFileUrls.map((item) => (
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              {item.type &&
                item.type !== "image/jpeg" &&
                item.type !== "application/pdf" &&
                item.type !==
                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document" &&
                item.type !==
                  "application/vnd.openxmlformats-officedocument.presentationml.presentation" &&
                item.type !==
                  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" && (
                  <FileOutlined style={{ fontSize: 40 }} />
                )}
              {item.type === "image/jpeg" && (
                <FileImageFilled style={{ fontSize: 40 }} />
              )}
              {item.type === "application/pdf" && (
                <FilePdfFilled style={{ fontSize: 40, color: "#e03030" }} />
              )}

              {item.type ===
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document" && (
                <FileWordFilled style={{ fontSize: 40, color: "#295396" }} />
              )}

              {item.type ===
                "application/vnd.openxmlformats-officedocument.presentationml.presentation" && (
                <FilePptFilled style={{ fontSize: 40, color: "#d14423" }} />
              )}

              {item.type ===
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" && (
                <FileExcelFilled style={{ fontSize: 40, color: "#1f7246" }} />
              )}

              <a href={item.url} target="_blank">
                {item.name}
              </a>
            </div>
          ))}
        </div>
      </div>
      {/* <div style={{ height: 1, backgroundColor: "#ccc" }}></div> */}
      <div>
        {comments.length > 0 && <CommentList comments={comments} />}
        <Comment
          avatar={
            <Avatar
              style={{
                color: "#f56a00",
                backgroundColor: "#fde3cf",
                width: "35px",
                height: "35px",
              }}
            >
              {user.universityId}
            </Avatar>
          }
          content={
            <Editor
              onChange={handleChange}
              onSubmit={handleSubmit}
              submitting={submitting}
              value={value}
              resize={false}
            />
          }
        />
      </div>
    </div>
  ) : (
    <Spin />
  );
}

export default Lesson;
