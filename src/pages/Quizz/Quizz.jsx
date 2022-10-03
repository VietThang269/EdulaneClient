import { Button, Form, Modal, Radio, Spin } from "antd";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { apiUrl } from "../../constants";
import { Link } from "react-scroll";
import Countdown from "react-countdown";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import "./Quizz.css";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext/AuthContext";
import QuizzResponse from "../../components/QuizzResponse/QuizzResponse";

const { confirm } = Modal;

function Quizz() {
  var timer1;
  var timer2;
  var valueQuiz = [];

  const [form] = Form.useForm();
  const history = useHistory();
  const { quiId } = useParams();
  const [detail, setDetail] = useState();
  const [detailResponse, setDetailResponse] = useState();
  const [isLoading, setLoading] = useState(false);
  const [isShow, setShow] = useState(false);
  const [isShow1, setShow1] = useState(false);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getDetailQuizz = async (quizzId) => {
      const res = await axios.get(`${apiUrl}quizzes/${quizzId}`);
      setDetail(res.data);
      setLoading(true);
    };
    getDetailQuizz(quiId);
  }, [quiId]);

  useEffect(() => {
    const getAllResponseQuizz = async (quizzId) => {
      const res = await axios.get(
        `${apiUrl}quiz_responses/?quiz_id=${quizzId}`
      );
      console.log(res);
      setDetailResponse(res.data);
      // setLoading(true);
    };
    getAllResponseQuizz(quiId);
  }, [quiId]);

  const historyPush = () => {
    history.push(`/courses/${detail.class_id}`);
  };

  const timeUp = () => {
    setShow(true);
  };

  if (isLoading) {
    timer1 = detail.startingDate.split(":");
    timer2 =
      Number(timer1[0]) * 3600 + Number(timer1[1]) * 60 + Number(timer1[2]);
  }

  const onFinish = (value) => {
    console.log(value);

    const data = Object.values(value);
    const lengthQuiz = detail.quiz_questions.length;
    const mark = 10 / lengthQuiz;
    var total = 0;
    var correct = 0;
    var wrong = 0;
    detail.quiz_questions.map((item, index) => {
      if (item.correctOption == data[index]) {
        total += mark;
        correct += 1;
      } else {
        wrong += 1;
      }
    });
    confirm({
      title: "",
      icon: <ExclamationCircleOutlined />,
      content: "Bạn vẫn còn thời gian, bạn có chắc muốn nộp bài không ?",
      onOk() {
        createResponse(data, total, correct, wrong);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const createResponse = async (data, total, correct, wrong) => {
    const res = await axios.post(`${apiUrl}quiz_responses/create`, {
      user_answer: data,
      total_correct: correct,
      total_wrong: wrong,
      scores: total,
      user_id: user._id,
      quiz_id: quiId,
    });

    if (res) {
      Modal.success({
        content: `Bạn được ${total} điểm`,
        afterClose: historyPush,
      });
    }
  };

  const onCheck = async () => {
    const value = await form.validateFields();

    if (value) {
      const data = Object.values(value);
      const lengthQuiz = detail.quiz_questions.length;
      const mark = 10 / lengthQuiz;
      var total = 0;
      var correct = 0;
      var wrong = 0;

      detail.quiz_questions.map((item, index) => {
        if (item.correctOption == data[index]) {
          total += mark;
          correct += 1;
        } else {
          wrong += 1;
        }
      });

      createResponse(data, total, correct, wrong);
    }
  };

  const handleAllResponse = () => {
    setShow1(true);
  };

  console.log("ré", detailResponse);

  return isLoading ? (
    <div className="quizz_page">
      <Form onFinish={onFinish} form={form} autoComplete="off">
        <div className="quizz_page_left">
          {detail.quiz_questions.map((item, index) => (
            <div className="quizz_item_page" id={`q${index}`}>
              <p>
                <span>Câu {index + 1}:</span>
                &nbsp; {item.name}
              </p>
              <Form.Item name={`pick${index + 1}`}>
                <Radio.Group
                  name="radiogroup"
                  style={{
                    display: "flex",
                    gap: "1rem",
                    flexDirection: "column",
                  }}
                >
                  <Radio value={1}>{item.option[0]}</Radio>
                  <Radio value={2}>{item.option[1]}</Radio>
                  <Radio value={3}>{item.option[2]}</Radio>
                  <Radio value={4}>{item.option[3]}</Radio>
                </Radio.Group>
              </Form.Item>
            </div>
          ))}
        </div>
        <div className="quizz_page_right">
          <p>Tổng số câu:</p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.6rem",
              padding: "0 10px",
            }}
          >
            {detail.quiz_questions.map((item, index) => (
              <div className="quizz_item_nav">
                <Link style={{ color: "var(--main-color)" }} to={`q${index}`}>
                  {index + 1}
                </Link>
              </div>
            ))}
          </div>
          {!user.isTeacher ? (
            <Button type="primary" htmlType="submit">
              Nộp bài
            </Button>
          ) : (
            <Button type="primary" onClick={handleAllResponse}>
              Xem các bài đã nộp
            </Button>
          )}
          <Modal
            visible={isShow1}
            title="Các bài đã nộp"
            onOk={(e) => setShow1(false)}
            onCancel={(e) => setShow1(false)}
          >
            {detailResponse?.map(({ user_id, scores }) => (
              <QuizzResponse user_id={user_id} scores={scores} />
            ))}
          </Modal>
          <Modal visible={isShow} closeIcon={[]} footer={[]}>
            <div
              style={{
                padding: "12px 12px 0 7px",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <ExclamationCircleOutlined
                  style={{ color: "red", fontSize: 20 }}
                />
                <p style={{ margin: 0, fontSize: 16 }}>Đã hết thời gian !!!</p>
              </div>
              <Button
                type="primary"
                onClick={onCheck}
                style={{ width: "20%", marginLeft: 350 }}
              >
                OK
              </Button>
            </div>
          </Modal>
          {!user.isTeacher && (
            <div className="time_countdown">
              <p className="title_time">
                Thời gian còn lại:{" "}
                <Countdown
                  date={Date.now() + timer2 * 1000}
                  onComplete={timeUp}
                />
              </p>
            </div>
          )}
        </div>
      </Form>
    </div>
  ) : (
    <Spin />
  );
}

export default Quizz;
