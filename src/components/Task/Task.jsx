import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiUrl } from "../../constants";
import Quizz from "../Quizz/Quizz";
import "./Task.css";

function Task({ classId }) {
  const [data, setData] = useState();
  const [isLoading3, setLoading3] = useState(true);

  useEffect(() => {
    const getAllQuizz = async () => {
      const res = await axios.get(`${apiUrl}quizzes/?class_id=${classId}`);
      setData(res.data);
    };
    getAllQuizz();
  }, [classId, isLoading3]);

  return (
    <div className="task">
      {data?.map(({ _id, title, quiz_questions, startingDate, repeatQuiz }) => (
        <Quizz
          classId={classId}
          repeatQuiz={repeatQuiz}
          id={_id}
          title={title}
          quiz_questions={quiz_questions}
          startingDate={startingDate}
          isLoading3={isLoading3}
          setLoading3={setLoading3}
        />
      ))}
    </div>
  );
}

export default Task;
