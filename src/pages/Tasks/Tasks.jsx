import { Empty, Spin } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Task from "../../components/Task/Task";
import { apiUrl } from "../../constants";
import { AuthContext } from "../../contexts/authContext/AuthContext";
import "./Tasks.css";

function Tasks() {
  const { user } = useContext(AuthContext);
  const [classTeacher, setClassTeacher] = useState([]);
  const [classStudent, setClassStudent] = useState([]);
  const [isLoading, setLoading] = useState(true);
  // const [detail, setDetail] = useState();

  useEffect(() => {
    const getAllClassTeacher = async () => {
      const res = await axios.get(`${apiUrl}classes/getAdmin/${user._id}`);
      res.data.map(({ _id }) => {
        setClassTeacher((prevArray) => [...prevArray, _id]);
      });
      setLoading(false);
    };
    getAllClassTeacher();
  }, [user._id]);

  useEffect(() => {
    const getAllClassStudent = async () => {
      const res = await axios.get(`${apiUrl}classes/${user._id}`);
      res.data.map(({ _id }) => {
        setClassStudent((prevArray) => [...prevArray, _id]);
      });
      setLoading(false);
    };
    getAllClassStudent();
  }, [user._id]);

  console.log("s", classTeacher);
  return (
    <div className="tasks">
      {isLoading ? <Spin /> : classTeacher.map((id) => <Task classId={id} />)}
      {isLoading ? <Spin /> : classStudent.map((id) => <Task classId={id} />)}
    </div>
  );
}

export default Tasks;
