import { Button, Spin, Upload, message, Tabs, Modal, Input } from "antd";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  CopyOutlined,
  InboxOutlined,
  PlusSquareOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import axios from "axios";
import JoditEditor from "jodit-react";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import AddStudent from "../../components/AddStudent/AddStudent";
import Lesson from "../../components/Lesson/Lesson";
import { apiUrl } from "../../constants";
import { AuthContext } from "../../contexts/authContext/AuthContext";
import "./CourseDetail.css";
import storage from "../../firebase.js";
import Assignment from "../../components/Assignments/Assignment/Assignment";
import { AssignmentContext } from "../../contexts/assignmentContext/AssignmentContext";
import {
  getAssignment,
  getAssignmentByID,
} from "../../contexts/assignmentContext/apiCalls";
import CreateAssignment from "../../components/CreateAssignment/CreateAssignment";
import CreateQuizz from "../../components/CreateQuizz/CreateQuizz";
import { QuizzContext } from "../../contexts/quizzContext/QuizzContext";
import { getQuizzByID } from "../../contexts/quizzContext/apiCalls";
import Quizz from "../../components/Quizz/Quizz";

const { TabPane } = Tabs;

function CourseDetail() {
  const { id } = useParams();
  const [detail, setDetail] = useState({});
  const [lesson, setLesson] = useState([]);
  const { user } = useContext(AuthContext);
  const [isLoading1, setLoading1] = useState(true);
  const [isLoading2, setLoading2] = useState(true);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState("");
  const [newUrl, setNewUrl] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [className, setClassName] = useState("");
  const [section, setSection] = useState("");
  const [isLoading3, setLoading3] = useState(true);

  useEffect(() => {
    const getDetailCourse = async (courseId) => {
      const res = await axios.get(`${apiUrl}classes/get/${courseId}`);
      setDetail(res.data);
      setLoading1(false);
    };
    getDetailCourse(id);
  }, [id, loading]);

  useEffect(() => {
    const getLesson = async (courseId) => {
      const res = await axios.get(`${apiUrl}class_contents/${courseId}`);
      setLesson(res.data);
      setLoading2(false);
    };
    getLesson(id);
  }, [loading]);

  const handleCreateContent = async () => {
    const res = await axios.post(`${apiUrl}class_contents/create`, {
      rawText: value,
      classId: id,
      userId: user._id,
      attachedFileUrls: newUrl,
    });
    setValue("");
    setFileList([]);
    setNewUrl([]);
    setLoading(!loading);
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

  const { assignments, dispatch: dispatch1 } = useContext(AssignmentContext);
  const { quizzes, dispatch } = useContext(QuizzContext);

  useEffect(() => {
    getAssignmentByID(id, dispatch1);
  }, [id, dispatch1, isLoading3]);

  useEffect(() => {
    getQuizzByID(id, dispatch);
  }, [id, dispatch, isLoading3]);

  console.log("q", quizzes);

  const [file, setFile] = useState(null);
  console.log("file", file);

  const handleChangeFile = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="course_detail">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Khóa học" key="1">
          <div style={{ display: "flex", gap: "1rem" }}>
            <div className="course_left">
              <div className="course_left_title shadow">
                <img
                  src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNzgiIGhlaWdodD0iMjA1Ij48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJyZ2IoMTA4LCA5MiwgMjMxKSIgLz48cmVjdCB4PSItMTguODMzMzMzMzMzMzMzIiB5PSItMTguODMzMzMzMzMzMzMzIiB3aWR0aD0iMzcuNjY2NjY2NjY2NjY3IiBoZWlnaHQ9IjM3LjY2NjY2NjY2NjY2NyIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utb3BhY2l0eT0iMC4wMiIgZmlsbD0iI2RkZCIgZmlsbC1vcGFjaXR5PSIwLjE0MTMzMzMzMzMzMzMzIiBzdHJva2Utd2lkdGg9IjEiIC8+PHJlY3QgeD0iMTU5LjQwNzI0NzA4NTA5IiB5PSItMTguODMzMzMzMzMzMzMzIiB3aWR0aD0iMzcuNjY2NjY2NjY2NjY3IiBoZWlnaHQ9IjM3LjY2NjY2NjY2NjY2NyIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utb3BhY2l0eT0iMC4wMiIgZmlsbD0iI2RkZCIgZmlsbC1vcGFjaXR5PSIwLjE0MTMzMzMzMzMzMzMzIiBzdHJva2Utd2lkdGg9IjEiIC8+PHJlY3QgeD0iLTE4LjgzMzMzMzMzMzMzMyIgeT0iMTg2Ljk4MTE2MDgzNjg2IiB3aWR0aD0iMzcuNjY2NjY2NjY2NjY3IiBoZWlnaHQ9IjM3LjY2NjY2NjY2NjY2NyIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utb3BhY2l0eT0iMC4wMiIgZmlsbD0iI2RkZCIgZmlsbC1vcGFjaXR5PSIwLjE0MTMzMzMzMzMzMzMzIiBzdHJva2Utd2lkdGg9IjEiIC8+PHJlY3QgeD0iMTU5LjQwNzI0NzA4NTA5IiB5PSIxODYuOTgxMTYwODM2ODYiIHdpZHRoPSIzNy42NjY2NjY2NjY2NjciIGhlaWdodD0iMzcuNjY2NjY2NjY2NjY3IiBzdHJva2U9IiMwMDAiIHN0cm9rZS1vcGFjaXR5PSIwLjAyIiBmaWxsPSIjZGRkIiBmaWxsLW9wYWNpdHk9IjAuMTQxMzMzMzMzMzMzMzMiIHN0cm9rZS13aWR0aD0iMSIgLz48cmVjdCB4PSI3MC4yODY5NTY4NzU4ODEiIHk9IjMyLjYyMDI5MDIwOTIxNCIgd2lkdGg9IjM3LjY2NjY2NjY2NjY2NyIgaGVpZ2h0PSIzNy42NjY2NjY2NjY2NjciIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMDIiIGZpbGw9IiNkZGQiIGZpbGwtb3BhY2l0eT0iMC4xMjQiIHN0cm9rZS13aWR0aD0iMSIgLz48cmVjdCB4PSItMTguODMzMzMzMzMzMzMzIiB5PSI4NC4wNzM5MTM3NTE3NjEiIHdpZHRoPSIzNy42NjY2NjY2NjY2NjciIGhlaWdodD0iMzcuNjY2NjY2NjY2NjY3IiBzdHJva2U9IiMwMDAiIHN0cm9rZS1vcGFjaXR5PSIwLjAyIiBmaWxsPSIjMjIyIiBmaWxsLW9wYWNpdHk9IjAuMDI4NjY2NjY2NjY2NjY3IiBzdHJva2Utd2lkdGg9IjEiIC8+PHJlY3QgeD0iMTU5LjQwNzI0NzA4NTA5IiB5PSI4NC4wNzM5MTM3NTE3NjEiIHdpZHRoPSIzNy42NjY2NjY2NjY2NjciIGhlaWdodD0iMzcuNjY2NjY2NjY2NjY3IiBzdHJva2U9IiMwMDAiIHN0cm9rZS1vcGFjaXR5PSIwLjAyIiBmaWxsPSIjMjIyIiBmaWxsLW9wYWNpdHk9IjAuMDI4NjY2NjY2NjY2NjY3IiBzdHJva2Utd2lkdGg9IjEiIC8+PHJlY3QgeD0iNzAuMjg2OTU2ODc1ODgxIiB5PSIxMzUuNTI3NTM3Mjk0MzEiIHdpZHRoPSIzNy42NjY2NjY2NjY2NjciIGhlaWdodD0iMzcuNjY2NjY2NjY2NjY3IiBzdHJva2U9IiMwMDAiIHN0cm9rZS1vcGFjaXR5PSIwLjAyIiBmaWxsPSIjZGRkIiBmaWxsLW9wYWNpdHk9IjAuMDIiIHN0cm9rZS13aWR0aD0iMSIgLz48cG9seWxpbmUgcG9pbnRzPSIwLCAwLCAzMi42MjAyOTAyMDkyMTQsIDE4LjgzMzMzMzMzMzMzMywgMCwgMzcuNjY2NjY2NjY2NjY3LCAwLCAwIiBzdHJva2U9IiMwMDAiIHN0cm9rZS1vcGFjaXR5PSIwLjAyIiBmaWxsPSIjMjIyIiBmaWxsLW9wYWNpdHk9IjAuMTE1MzMzMzMzMzMzMzMiIHN0cm9rZS13aWR0aD0iMSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTguODMzMzMzMzMzMzMzLCAtMTguODMzMzMzMzMzMzMzKSByb3RhdGUoMCwgMTguODMzMzMzMzMzMzMzLCAxNi4zMTAxNDUxMDQ2MDcpIiAvPjxwb2x5bGluZSBwb2ludHM9IjAsIDAsIDMyLjYyMDI5MDIwOTIxNCwgMTguODMzMzMzMzMzMzMzLCAwLCAzNy42NjY2NjY2NjY2NjcsIDAsIDAiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMDIiIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4xMTUzMzMzMzMzMzMzMyIgc3Ryb2tlLXdpZHRoPSIxIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxOC44MzMzMzMzMzMzMzMsIDIyNC42NDc4Mjc1MDM1Mikgcm90YXRlKDAsIDE4LjgzMzMzMzMzMzMzMywgMTYuMzEwMTQ1MTA0NjA3KSBzY2FsZSgxLCAtMSkiIC8+PHBvbHlsaW5lIHBvaW50cz0iMCwgMCwgMzIuNjIwMjkwMjA5MjE0LCAxOC44MzMzMzMzMzMzMzMsIDAsIDM3LjY2NjY2NjY2NjY2NywgMCwgMCIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utb3BhY2l0eT0iMC4wMiIgZmlsbD0iI2RkZCIgZmlsbC1vcGFjaXR5PSIwLjA1NDY2NjY2NjY2NjY2NyIgc3Ryb2tlLXdpZHRoPSIxIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNTkuNDA3MjQ3MDg1MDksIC0xOC44MzMzMzMzMzMzMzMpIHJvdGF0ZSgwLCAxOC44MzMzMzMzMzMzMzMsIDE2LjMxMDE0NTEwNDYwNykgc2NhbGUoLTEsIDEpIiAvPjxwb2x5bGluZSBwb2ludHM9IjAsIDAsIDMyLjYyMDI5MDIwOTIxNCwgMTguODMzMzMzMzMzMzMzLCAwLCAzNy42NjY2NjY2NjY2NjcsIDAsIDAiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMDIiIGZpbGw9IiNkZGQiIGZpbGwtb3BhY2l0eT0iMC4wNTQ2NjY2NjY2NjY2NjciIHN0cm9rZS13aWR0aD0iMSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTU5LjQwNzI0NzA4NTA5LCAyMjQuNjQ3ODI3NTAzNTIpIHJvdGF0ZSgwLCAxOC44MzMzMzMzMzMzMzMsIDE2LjMxMDE0NTEwNDYwNykgc2NhbGUoLTEsIC0xKSIgLz48cG9seWxpbmUgcG9pbnRzPSIwLCAwLCAzMi42MjAyOTAyMDkyMTQsIDE4LjgzMzMzMzMzMzMzMywgMCwgMzcuNjY2NjY2NjY2NjY3LCAwLCAwIiBzdHJva2U9IiMwMDAiIHN0cm9rZS1vcGFjaXR5PSIwLjAyIiBmaWxsPSIjMjIyIiBmaWxsLW9wYWNpdHk9IjAuMDgwNjY2NjY2NjY2NjY3IiBzdHJva2Utd2lkdGg9IjEiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEwNy45NTM2MjM1NDI1NSwgMzIuNjIwMjkwMjA5MjE0KSIgLz48cG9seWxpbmUgcG9pbnRzPSIwLCAwLCAzMi42MjAyOTAyMDkyMTQsIDE4LjgzMzMzMzMzMzMzMywgMCwgMzcuNjY2NjY2NjY2NjY3LCAwLCAwIiBzdHJva2U9IiMwMDAiIHN0cm9rZS1vcGFjaXR5PSIwLjAyIiBmaWxsPSIjZGRkIiBmaWxsLW9wYWNpdHk9IjAuMDg5MzMzMzMzMzMzMzMzIiBzdHJva2Utd2lkdGg9IjEiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDcwLjI4Njk1Njg3NTg4MSwgMzIuNjIwMjkwMjA5MjE0KSBzY2FsZSgtMSwgMSkiIC8+PHBvbHlsaW5lIHBvaW50cz0iMCwgMCwgMzIuNjIwMjkwMjA5MjE0LCAxOC44MzMzMzMzMzMzMzMsIDAsIDM3LjY2NjY2NjY2NjY2NywgMCwgMCIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utb3BhY2l0eT0iMC4wMiIgZmlsbD0iI2RkZCIgZmlsbC1vcGFjaXR5PSIwLjA1NDY2NjY2NjY2NjY2NyIgc3Ryb2tlLXdpZHRoPSIxIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMDcuOTUzNjIzNTQyNTUsIDE3My4xOTQyMDM5NjA5Nykgc2NhbGUoMSwgLTEpIiAvPjxwb2x5bGluZSBwb2ludHM9IjAsIDAsIDMyLjYyMDI5MDIwOTIxNCwgMTguODMzMzMzMzMzMzMzLCAwLCAzNy42NjY2NjY2NjY2NjcsIDAsIDAiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMDIiIGZpbGw9IiNkZGQiIGZpbGwtb3BhY2l0eT0iMC4wODkzMzMzMzMzMzMzMzMiIHN0cm9rZS13aWR0aD0iMSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNzAuMjg2OTU2ODc1ODgxLCAxNzMuMTk0MjAzOTYwOTcpIHNjYWxlKC0xLCAtMSkiIC8+PHBvbHlsaW5lIHBvaW50cz0iMCwgMCwgMzIuNjIwMjkwMjA5MjE0LCAxOC44MzMzMzMzMzMzMzMsIDAsIDM3LjY2NjY2NjY2NjY2NywgMCwgMCIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utb3BhY2l0eT0iMC4wMiIgZmlsbD0iIzIyMiIgZmlsbC1vcGFjaXR5PSIwLjA0NiIgc3Ryb2tlLXdpZHRoPSIxIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxOC44MzMzMzMzMzMzMzMsIDg0LjA3MzkxMzc1MTc2MSkiIC8+PHBvbHlsaW5lIHBvaW50cz0iMCwgMCwgMzIuNjIwMjkwMjA5MjE0LCAxOC44MzMzMzMzMzMzMzMsIDAsIDM3LjY2NjY2NjY2NjY2NywgMCwgMCIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utb3BhY2l0eT0iMC4wMiIgZmlsbD0iIzIyMiIgZmlsbC1vcGFjaXR5PSIwLjEzMjY2NjY2NjY2NjY3IiBzdHJva2Utd2lkdGg9IjEiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE1OS40MDcyNDcwODUwOSwgODQuMDczOTEzNzUxNzYxKSBzY2FsZSgtMSwgMSkiIC8+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjM3LjY2NjY2NjY2NjY2NyIgaGVpZ2h0PSIzNy42NjY2NjY2NjY2NjciIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMDIiIGZpbGw9IiNkZGQiIGZpbGwtb3BhY2l0eT0iMC4wODkzMzMzMzMzMzMzMzMiIHN0cm9rZS13aWR0aD0iMSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTguODMzMzMzMzMzMzMzLCAxOC44MzMzMzMzMzMzMzMpIHJvdGF0ZSgtMzAsIDAsIDApIiAvPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIzNy42NjY2NjY2NjY2NjciIGhlaWdodD0iMzcuNjY2NjY2NjY2NjY3IiBzdHJva2U9IiMwMDAiIHN0cm9rZS1vcGFjaXR5PSIwLjAyIiBmaWxsPSIjZGRkIiBmaWxsLW9wYWNpdHk9IjAuMDM3MzMzMzMzMzMzMzMzIiBzdHJva2Utd2lkdGg9IjEiIHRyYW5zZm9ybT0ic2NhbGUoLTEsIDEpIHRyYW5zbGF0ZSgtMTU5LjQwNzI0NzA4NTA5LCAxOC44MzMzMzMzMzMzMzMpIHJvdGF0ZSgtMzAsIDAsIDApIiAvPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIzNy42NjY2NjY2NjY2NjciIGhlaWdodD0iMzcuNjY2NjY2NjY2NjY3IiBzdHJva2U9IiMwMDAiIHN0cm9rZS1vcGFjaXR5PSIwLjAyIiBmaWxsPSIjMjIyIiBmaWxsLW9wYWNpdHk9IjAuMDgwNjY2NjY2NjY2NjY3IiBzdHJva2Utd2lkdGg9IjEiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE4LjgzMzMzMzMzMzMzMywgNDYuNDA3MjQ3MDg1MDk0KSByb3RhdGUoMzAsIDAsIDM3LjY2NjY2NjY2NjY2NykiIC8+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjM3LjY2NjY2NjY2NjY2NyIgaGVpZ2h0PSIzNy42NjY2NjY2NjY2NjciIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMDIiIGZpbGw9IiNkZGQiIGZpbGwtb3BhY2l0eT0iMC4wODkzMzMzMzMzMzMzMzMiIHN0cm9rZS13aWR0aD0iMSIgdHJhbnNmb3JtPSJzY2FsZSgtMSwgMSkgdHJhbnNsYXRlKC0xNTkuNDA3MjQ3MDg1MDksIDQ2LjQwNzI0NzA4NTA5NCkgcm90YXRlKDMwLCAwLCAzNy42NjY2NjY2NjY2NjcpIiAvPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIzNy42NjY2NjY2NjY2NjciIGhlaWdodD0iMzcuNjY2NjY2NjY2NjY3IiBzdHJva2U9IiMwMDAiIHN0cm9rZS1vcGFjaXR5PSIwLjAyIiBmaWxsPSIjZGRkIiBmaWxsLW9wYWNpdHk9IjAuMDcyIiBzdHJva2Utd2lkdGg9IjEiIHRyYW5zZm9ybT0ic2NhbGUoMSwgLTEpIHRyYW5zbGF0ZSgxOC44MzMzMzMzMzMzMzMsIC0xNTkuNDA3MjQ3MDg1MDkpIHJvdGF0ZSgzMCwgMCwgMzcuNjY2NjY2NjY2NjY3KSIgLz48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMzcuNjY2NjY2NjY2NjY3IiBoZWlnaHQ9IjM3LjY2NjY2NjY2NjY2NyIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utb3BhY2l0eT0iMC4wMiIgZmlsbD0iIzIyMiIgZmlsbC1vcGFjaXR5PSIwLjA5OCIgc3Ryb2tlLXdpZHRoPSIxIiB0cmFuc2Zvcm09InNjYWxlKC0xLCAtMSkgdHJhbnNsYXRlKC0xNTkuNDA3MjQ3MDg1MDksIC0xNTkuNDA3MjQ3MDg1MDkpIHJvdGF0ZSgzMCwgMCwgMzcuNjY2NjY2NjY2NjY3KSIgLz48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMzcuNjY2NjY2NjY2NjY3IiBoZWlnaHQ9IjM3LjY2NjY2NjY2NjY2NyIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utb3BhY2l0eT0iMC4wMiIgZmlsbD0iIzIyMiIgZmlsbC1vcGFjaXR5PSIwLjA2MzMzMzMzMzMzMzMzMyIgc3Ryb2tlLXdpZHRoPSIxIiB0cmFuc2Zvcm09InNjYWxlKDEsIC0xKSB0cmFuc2xhdGUoMTguODMzMzMzMzMzMzMzLCAtMTg2Ljk4MTE2MDgzNjg2KSByb3RhdGUoLTMwLCAwLCAwKSIgLz48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMzcuNjY2NjY2NjY2NjY3IiBoZWlnaHQ9IjM3LjY2NjY2NjY2NjY2NyIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utb3BhY2l0eT0iMC4wMiIgZmlsbD0iI2RkZCIgZmlsbC1vcGFjaXR5PSIwLjEwNjY2NjY2NjY2NjY3IiBzdHJva2Utd2lkdGg9IjEiIHRyYW5zZm9ybT0ic2NhbGUoLTEsIC0xKSB0cmFuc2xhdGUoLTE1OS40MDcyNDcwODUwOSwgLTE4Ni45ODExNjA4MzY4Nikgcm90YXRlKC0zMCwgMCwgMCkiIC8+PC9zdmc+"
                  alt=""
                />
                <div
                  style={{
                    backgroundColor: "white",
                    padding: "2% 3%",
                    borderRadius: 10,
                  }}
                >
                  <p
                    style={{
                      fontSize: 30,
                      color: "var(--main-color)",
                      fontWeight: "bold",
                      margin: 0,
                    }}
                  >
                    {isLoading1 ? <Spin /> : detail.className}
                  </p>
                  <p
                    style={{
                      color: "rgba(0, 0, 0, 0.45)",
                      fontSize: 20,
                      lineHeight: 1.5715,
                    }}
                  >
                    {detail.section}
                  </p>
                </div>

                {user.isTeacher && (
                  <div className="class_code">
                    <p>Code vào lớp: {detail.joinCode}</p>
                    <CopyToClipboard text={detail.joinCode}>
                      <CopyOutlined />
                    </CopyToClipboard>
                  </div>
                )}
              </div>
              <div>
                <input type="file" name="file" onChange={handleChangeFile} />
              </div>
              {user.isTeacher && (
                <div className="course_left_upload shadow">
                  <p
                    style={{
                      color: "var(--main-color)",
                      fontWeight: "bold",
                      fontSize: 20,
                    }}
                  >
                    Thêm buổi học
                  </p>
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
                        const storageRef = ref(
                          storage,
                          `/items/${data.file.name}`
                        );
                        const uploadTask = uploadBytesResumable(
                          storageRef,
                          data.file
                        );

                        uploadTask.on(
                          "state_changed",
                          (snapshot) => {
                            const progress =
                              (snapshot.bytesTransferred /
                                snapshot.totalBytes) *
                              100;
                            data.onProgress({ progress: progress }, data.file);
                          },
                          (error) => {
                            message.error(`Không thành công !`);
                          },
                          () => {
                            getDownloadURL(uploadTask.snapshot.ref).then(
                              (url) => {
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
                              }
                            );
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
                        Hỗ trợ tải một tệp hoặc nhiều tệp cùng lúc. Khuyến cáo
                        không nên tải tệp có tính bảo mật cao
                      </p>
                    </Upload.Dragger>
                  </div>
                  <Button
                    type="primary"
                    onClick={handleCreateContent}
                    style={{ marginTop: 30 }}
                  >
                    Đăng buổi học
                  </Button>
                </div>
              )}
              <div className="course_left_content shadow">
                <p className="title_p">Các buổi học</p>
                {lesson.map(
                  ({
                    rawText,
                    classId,
                    attachedFileUrls,
                    createdAt,
                    userId,
                    _id,
                  }) => (
                    <Lesson
                      contentId={_id}
                      user={user}
                      userId={userId}
                      createdAt={createdAt}
                      isLoading={isLoading2}
                      setLoading={setLoading}
                      isLoadingreal={loading}
                      rawText={rawText}
                      classId={classId}
                      attachedFileUrls={attachedFileUrls}
                    />
                  )
                )}
              </div>
            </div>
            <div className="course_right">
              {user.isTeacher && (
                <div className="add_student shadow">
                  <p className="title_p">Thêm sinh viên</p>
                  <AddStudent
                    id={id}
                    detail={detail}
                    isLoading={loading}
                    setLoading={setLoading}
                  />
                </div>
              )}
            </div>
          </div>
        </TabPane>
        <TabPane tab="Assignment" key="2">
          {assignments.map(
            ({ _id, title, instruction, startingDate, dueDate, name }) => (
              <Assignment
                detail={detail}
                id={_id}
                name={name}
                title={title}
                instruction={instruction}
                startingDate={startingDate}
                dueDate={dueDate}
                isLoading3={isLoading3}
                setLoading3={setLoading3}
              />
            )
          )}
          {user.isTeacher && (
            <CreateAssignment
              classId={id}
              isLoading3={isLoading3}
              setLoading3={setLoading3}
            />
          )}
        </TabPane>
        <TabPane tab="Kiểm tra" key="3">
          {quizzes.map(
            ({ _id, title, quiz_questions, startingDate, repeatQuiz }) => (
              <Quizz
                detail={detail}
                repeatQuiz={repeatQuiz}
                id={_id}
                title={title}
                quiz_questions={quiz_questions}
                startingDate={startingDate}
                isLoading3={isLoading3}
                setLoading3={setLoading3}
              />
            )
          )}
          {user.isTeacher && (
            <CreateQuizz
              classId={id}
              isLoading3={isLoading3}
              setLoading3={setLoading3}
            />
          )}
        </TabPane>
      </Tabs>
    </div>
  );
}

export default CourseDetail;
