import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { apiUrl } from "../../constants";
import Assignment from "../Assignments/Assignment/Assignment";
import moment from "moment";
import "./Exam.css";

function Exam({ classId, cut }) {
  const [data, setData] = useState();
  const [isLoading3, setLoading3] = useState(true);

  useEffect(() => {
    const getAllAssignment = async () => {
      const res = await axios.get(`${apiUrl}assignments/?class_id=${classId}`);
      setData(res.data);
    };
    getAllAssignment();
  }, [classId, isLoading3]);

  if (cut) {
    data?.sort((a, b) =>
      moment(a.dueDate, "DD-MM-YYYY").isBefore(moment(b.dueDate, "DD-MM-YYYY"))
        ? 1
        : -1
    );
    // data?.splice(1);
  }

  return (
    <div className="exam">
      {data?.map(({ _id, title, instruction, startingDate, dueDate, name }) => (
        <Assignment
          id={_id}
          name={name}
          title={title}
          instruction={instruction}
          startingDate={startingDate}
          dueDate={dueDate}
          classId={classId}
          isLoading3={isLoading3}
          setLoading3={setLoading3}
        />
      ))}
    </div>
  );
}

export default Exam;
