import { Empty, Spin } from "antd";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import Exam from "../../components/Exam/Exam";
import { apiUrl } from "../../constants";
import { AuthContext } from "../../contexts/authContext/AuthContext";
import "./Exams.css";

function Exams({ cut }) {
  const { user } = useContext(AuthContext);
  const [classTeacher, setClassTeacher] = useState([]);
  const [classStudent, setClassStudent] = useState([]);
  const [isLoading, setLoading] = useState(true);

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

  return (
    <div className="exams">
      {isLoading && user?.isTeacher ? (
        <Spin />
      ) : (
        classTeacher.map((id) => <Exam classId={id} cut={cut} />)
      )}
      {isLoading && !user?.isTeacher ? (
        <Spin />
      ) : (
        classStudent.map((id) => <Exam classId={id} cut={cut} />)
      )}
    </div>
  );
}

export default Exams;
