import { Button, Modal, Tag } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { apiUrl } from "../../constants";
import { AuthContext } from "../../contexts/authContext/AuthContext";
import { deleteQuizz } from "../../contexts/quizzContext/apiCalls";
import { QuizzContext } from "../../contexts/quizzContext/QuizzContext";
import "./Quizz.css";

function Quizz({
  title,
  id,
  quiz_questions,
  startingDate,
  detail,
  isLoading3,
  setLoading3,
  repeatQuiz,
}) {
  const { user } = useContext(AuthContext);
  const { dispatch } = useContext(QuizzContext);
  const [quizzResponse, setQuizzResponse] = useState(null);
  const [isShow, setShow] = useState(false);
  const handleDelete = () => {
    deleteQuizz(id, dispatch);
    setLoading3(!isLoading3);
  };

  useEffect(() => {
    const getQuizzResponse = async () => {
      const res = await axios.get(
        `${apiUrl}quiz_responses/find/${user?._id}/${id}`
      );
      if (res.data) setQuizzResponse(res.data);
    };
    getQuizzResponse();
  }, [id, user?._id]);

  var bodyBtn = <Button type="primary">Truy cập</Button>;
  if (quizzResponse !== null) {
    if (!repeatQuiz && !user.isTeacher)
      bodyBtn = (
        <Button type="primary" disabled>
          Truy cập
        </Button>
      );
  }

  console.log("quizzResponse", quizzResponse);

  return (
    <div className="quizz shadow">
      <div className="quizz_title">
        <div className="dot" style={{ backgroundColor: `var(--green)` }}></div>
        <div className="title-content">
          <a className="title-content-class">{title}</a>
          <p
            style={{
              color: "rgba(0, 0, 0, 0.45)",
              fontSize: 13,
            }}
          >
            {detail?.section}
          </p>
        </div>
      </div>
      <div className="quizz_tag">
        <Tag color="success">
          {repeatQuiz ? "Làm nhiều lần" : "Làm một lần"}
        </Tag>
      </div>
      <div className="quizz_time">
        <p>Gồm: {quiz_questions.length} câu</p>
        <p>Làm trong: {startingDate}</p>
      </div>
      <div
        style={{
          display: "flex",
          gap: "1rem",
        }}
      >
        <Link to={`/quizz/${id}`}>{bodyBtn}</Link>
        {user.isTeacher && (
          <Button type="danger" onClick={handleDelete}>
            Xóa
          </Button>
        )}
        {!user.isTeacher && (
          <Button type="dashed" onClick={(e) => setShow(true)}>
            Xem điểm
          </Button>
        )}
        <Modal
          visible={isShow}
          title="Điểm số"
          onOk={(e) => setShow(false)}
          onCancel={(e) => setShow(false)}
        >
          {quizzResponse?.map((item, index) => (
            <p key={index}>
              Điểm lần thứ {index + 1}:{" "}
              <span style={{ fontWeight: "bold" }}>{item.scores}</span> điểm
            </p>
          ))}
        </Modal>
      </div>
    </div>
  );
}

export default Quizz;
