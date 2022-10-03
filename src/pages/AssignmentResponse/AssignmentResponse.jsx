import { Avatar, Button, Select } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiUrl } from "../../constants";
import moment from "moment";
import parse from "html-react-parser";
import "./AssignmentResponse.css";
import {
  FileExcelFilled,
  FileImageFilled,
  FileOutlined,
  FilePdfFilled,
  FilePptFilled,
  FileWordFilled,
} from "@ant-design/icons";
import { async } from "@firebase/util";

const { Option } = Select;

function AssignmentResponse() {
  const { assResId } = useParams();
  const [data, setData] = useState();
  const [user, setUser] = useState();
  const [userId, setUserId] = useState();
  const [mark, setMark] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);

  var todayDateFormat = "";

  useEffect(() => {
    const getDetailResponseAssignment = async (id) => {
      const res = await axios.get(
        `${apiUrl}  const time = moment(updateAt).format("DD-MM-YYYY HH:mm A");
        /?assignment_response_id=${id}`
      );
      console.log("response", res.data);
      setData(res.data);
      setUserId(res.data.user_id);
      setLoading(true);
    };
    getDetailResponseAssignment(assResId);
  }, [assResId]);

  useEffect(() => {
    const getUser = async (userId) => {
      const res = await axios.get(`${apiUrl}users/${userId}`);
      setUser(res.data);
      setLoading1(true);
    };
    if (userId) getUser(userId);
  }, [userId]);

  if (loading) {
    todayDateFormat = moment(data.createdAt).format("DD-MM-YYYY HH:mm A");
  }

  const body = Array.from(Array(10).keys());

  const handleChange = (value) => {
    console.log(value);
    setMark(value);
  };

  const handleReturn = async () => {
    const res = await axios.put(
      `${apiUrl}assignment_responses/update/${assResId}`,
      {
        marks: mark,
      }
    );
    console.log(res.data);
  };

  return (
    <div className="assignment_response_page">
      <div className="assignment_response_page-left">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "2% 3%",
            backgroundColor: "white",
            borderRadius: 10,
          }}
        >
          <div className="assignment_response_page-info">
            <Avatar
              style={{
                color: "#f56a00",
                backgroundColor: "#fde3cf",
                width: "35px",
                height: "35px",
              }}
            >
              {loading1 && user.universityId}
            </Avatar>
            <div>
              <p style={{ fontWeight: "600", margin: 0 }}>
                {loading1 && user.fullName}
              </p>
              <p
                style={{
                  color: "rgba(0, 0, 0, 0.45)",
                  fontSize: 14,
                  lineHeight: 1.5715,
                  margin: 0,
                }}
              >
                {todayDateFormat}
              </p>
            </div>
          </div>
          <div className="assignment_response_page-content">
            <p>Content</p>
            {loading1 && parse(data.rawText)}
            <p>File</p>
            <div>
              {loading &&
                data.assignmentFileUrl.map((item) => (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
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
                      <FilePdfFilled
                        style={{ fontSize: 40, color: "#e03030" }}
                      />
                    )}

                    {item.type ===
                      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" && (
                      <FileWordFilled
                        style={{ fontSize: 40, color: "#295396" }}
                      />
                    )}

                    {item.type ===
                      "application/vnd.openxmlformats-officedocument.presentationml.presentation" && (
                      <FilePptFilled
                        style={{ fontSize: 40, color: "#d14423" }}
                      />
                    )}

                    {item.type ===
                      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" && (
                      <FileExcelFilled
                        style={{ fontSize: 40, color: "#1f7246" }}
                      />
                    )}

                    <a href={item.url} target="_blank">
                      {item.name}
                    </a>
                  </div>
                ))}
            </div>
            <div>
              <p>Point</p>
              <Select
                defaultValue="1"
                style={{
                  width: 120,
                }}
                onChange={handleChange}
              >
                {body.map((item, index) => (
                  <Option value={`${index + 1}`}>{item + 1}</Option>
                ))}
              </Select>
            </div>
          </div>
        </div>
      </div>
      <div className="assignment_response_page-right">
        <Button type="primary" onClick={handleReturn}>
          Return
        </Button>
      </div>
    </div>
  );
}

export default AssignmentResponse;
