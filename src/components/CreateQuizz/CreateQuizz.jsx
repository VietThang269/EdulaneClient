import {
  DeleteOutlined,
  EditOutlined,
  InboxOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import {
  Button,
  Collapse,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Radio,
  Select,
  Space,
  TimePicker,
  Upload,
} from "antd";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import JoditEditor from "jodit-react";
import { v4 as uuid } from "uuid";
import React, { useState } from "react";
import storage from "../../firebase";
import "./CreateQuizz.css";
import moment from "moment";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext/AuthContext";
import { AssignmentContext } from "../../contexts/assignmentContext/AssignmentContext";
import axios from "axios";
import { apiUrl } from "../../constants";
import { async } from "@firebase/util";

const { RangePicker } = DatePicker;
const { Option } = Select;
const { TextArea } = Input;
const { Panel } = Collapse;

function CreateQuizz({ classId, isLoading3, setLoading3 }) {
  const [value, setValue] = useState("");
  const [newUrl, setNewUrl] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [title, setTitle] = useState();
  const [point, setPoint] = useState();
  const [form] = Form.useForm();
  const [time, setTime] = useState();
  const [repeat, setRepeat] = useState(false);

  const { user } = useContext(AuthContext);
  const { dispatch } = useContext(AssignmentContext);

  const onFinish = async (values) => {
    const quiz_questions = values.users.map((item) => ({
      name: item.question,
      option: [item.answerA, item.answerB, item.answerC, item.answerD],
      correctOption: item.correct,
    }));

    console.log({
      title: title,
      startingDate: time,
      quiz_questions: quiz_questions,
      author_id: user._id,
      class_id: classId,
      repeatQuiz: repeat,
    });

    const res = await axios.post(`${apiUrl}quizzes/create`, {
      title: title,
      startingDate: time,
      quiz_questions: quiz_questions,
      author_id: user._id,
      class_id: classId,
      repeatQuiz: repeat,
    });
    form.resetFields();
    setTitle("");
    setLoading3(!isLoading3);
    setIsModalVisible(false);
  };

  const customPanelStyle = {
    background: "#f7f7f7",
    borderRadius: 4,
    marginBottom: 24,
    border: 0,
    overflow: "hidden",
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    message.success("HI");
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const [body, setBody] = useState([
    {
      title: `Question`,
      uique: uuid(),
    },
  ]);

  const changeTime = (time, timeString) => {
    setTime(timeString);
  };

  const handleChange = (value) => {
    value === "1" ? setRepeat(false) : setRepeat(true);
  };

  return (
    <div className="create_assignment">
      <Button type="primary" onClick={showModal}>
        <PlusSquareOutlined /> Tạo Quizz mới
      </Button>
      <Modal
        title="Tạo Quizz mới"
        visible={isModalVisible}
        onCancel={handleCancel}
        confirmLoading={confirmLoading}
        width={1000}
        style={{
          top: 20,
        }}
        footer={[]}
      >
        <div
          style={{
            display: "flex",
            gap: "1rem",
            fontWeight: "bold",
            marginBottom: 20,
          }}
        >
          <div
            style={{
              flex: "3",
              width: "80%",
              fontWeight: "bold",
            }}
          >
            <p>Tiêu đề</p>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Tiêu đề"
            />
          </div>
          <div>
            <p>Thời gian</p>
            <TimePicker placeholder="Thời gian" onChange={changeTime} />
          </div>
          <div>
            <p>Lựa chọn hình thức</p>
            <Select
              defaultValue="1"
              style={{
                width: "100%",
              }}
              onChange={handleChange}
            >
              <Option value="1">Làm một lần</Option>
              <Option value="2">Làm nhiều lần</Option>
            </Select>
          </div>
        </div>

        <div>
          <Form
            name="dynamic_form_nest_item"
            form={form}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.List name="users">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, title, ...restField }) => (
                    <Collapse bordered={false}>
                      <Panel
                        header={
                          <div className="questions">
                            <div className="questions_content">
                              <Form.Item
                                {...restField}
                                name={[name, "question"]}
                                label="Câu hỏi:"
                                rules={[
                                  {
                                    required: true,
                                    message: "Missing question",
                                  },
                                ]}
                              >
                                <TextArea />
                              </Form.Item>
                            </div>
                            <div className="questions_edit">
                              <EditOutlined
                                style={{ fontSize: 20, marginRight: 10 }}
                              />
                              <DeleteOutlined
                                style={{ fontSize: 20 }}
                                onClick={() => remove(name)}
                              />
                            </div>
                          </div>
                        }
                        key={key}
                        style={customPanelStyle}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                            width: "80%",
                            marginLeft: "10%",
                          }}
                        >
                          <div className="flex content_question">
                            <div className="flex">
                              <Form.Item
                                {...restField}
                                name={[name, "answerA"]}
                                label="A"
                                rules={[
                                  {
                                    required: true,
                                    message: "Missing answer A",
                                  },
                                ]}
                              >
                                <Input />
                              </Form.Item>
                            </div>
                            <div className="flex">
                              <Form.Item
                                {...restField}
                                name={[name, "answerB"]}
                                label="B"
                                rules={[
                                  {
                                    required: true,
                                    message: "Missing answer B",
                                  },
                                ]}
                              >
                                <Input />
                              </Form.Item>
                            </div>
                            <div className="flex">
                              <Form.Item
                                {...restField}
                                name={[name, "answerC"]}
                                label="C"
                                rules={[
                                  {
                                    required: true,
                                    message: "Missing answer C",
                                  },
                                ]}
                              >
                                <Input />
                              </Form.Item>
                            </div>
                            <div className="flex">
                              <Form.Item
                                {...restField}
                                name={[name, "answerD"]}
                                label="D"
                                rules={[
                                  {
                                    required: true,
                                    message: "Missing answer D",
                                  },
                                ]}
                              >
                                <Input />
                              </Form.Item>
                            </div>
                          </div>
                          <div className="flex">
                            <Form.Item
                              {...restField}
                              name={[name, "correct"]}
                              label="Đáp án chính xác:"
                              rules={[
                                {
                                  required: true,
                                  message: "Missing answer correct",
                                },
                              ]}
                            >
                              <Radio.Group>
                                <Radio value={1}>A</Radio>
                                <Radio value={2}>B</Radio>
                                <Radio value={3}>C</Radio>
                                <Radio value={4}>D</Radio>
                              </Radio.Group>
                            </Form.Item>
                          </div>
                        </div>
                      </Panel>
                    </Collapse>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => {
                        add();
                      }}
                      block
                      icon={<PlusOutlined />}
                    >
                      Thêm câu hỏi
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Tạo Quizz
              </Button>
              <Button type="default" style={{ marginLeft: 10 }}>
                Quay về
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
}

export default CreateQuizz;
