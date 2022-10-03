import {
  Badge,
  Button,
  Calendar,
  Input,
  Modal,
  Select,
  TimePicker,
} from "antd";
import React from "react";
import { useState } from "react";
import "./Calendars.css";
import moment from "moment";
import { useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../../constants";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext/AuthContext";
import { PlusCircleOutlined } from "@ant-design/icons";
import CalendarItem from "../../components/CalendarItem/CalendarItem";
const { Option } = Select;

function Calendars() {
  const [time, setTime] = useState(moment());
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [dataDay, setDataDay] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [content, setContent] = useState();
  const [type, setType] = useState("success");
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [isLoading, setLoading] = useState(false);
  const [dateVal, setDateVal] = useState();

  const onSelect = (data) => {
    setTime(data);
  };

  useEffect(() => {
    const getData = async (userId) => {
      const res = await axios.get(`${apiUrl}calendar/get_data/${userId}`);
      setData(res.data);
    };
    getData(user._id);
  }, [user._id, isLoading]);

  useEffect(() => {
    const getDataDay = async () => {
      const res = await axios.get(
        `${apiUrl}calendar/get_data_day/?data=${user._id}.${time.format(
          "DD/MM/yyyy"
        )}`
      );
      console.log(res.data);
      setDataDay(res.data);
    };
    getDataDay();
  }, [time, isLoading]);

  const getDayofWeek = (current_day) => {
    var day_name;
    switch (current_day) {
      case 0:
        day_name = "Chủ nhật";
        break;
      case 1:
        day_name = "Thứ hai";
        break;
      case 2:
        day_name = "Thứ ba";
        break;
      case 3:
        day_name = "Thứ tư";
        break;
      case 4:
        day_name = "Thứ năm";
        break;
      case 5:
        day_name = "Thứ sau";
        break;
      case 6:
        day_name = "Thứ bảy";
    }

    return day_name;
  };

  const dateCellRender = (value) => {
    const stringValue = value.format("DD/MM/yyyy");
    const listData = data.filter(({ date }) => date === stringValue);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleOk = async () => {
    const res = await axios.post(`${apiUrl}calendar/`, {
      userId: user._id,
      content: content,
      date: time.format("DD/MM/yyyy"),
      type: type,
      startAt: start,
      endAt: end,
    });
    setContent("");
    setType("success");
    setLoading(!isLoading);
    setOpen(false);
  };

  const handleChange = (value) => {
    setType(value);
  };

  const onChange = (value, dateString) => {
    setStart(value[0].format("HH:mm A"));
    setEnd(value[1].format("HH:mm A"));
  };

  return (
    <div className="calendar_page">
      <div className="calendar_left">
        <Calendar dateCellRender={dateCellRender} onSelect={onSelect} />
      </div>
      <div className="calendar_right">
        <div className="calendar_time">
          <h2 className="calendar_title">Kế hoạch</h2>
          <p>
            {time.format("DD/MM/YYYY")}, {getDayofWeek(time.day())}
          </p>
          <Button type="primary" onClick={handleOpen}>
            <PlusCircleOutlined />
            Thêm kế hoạch
          </Button>
          <Modal
            title="Thêm kế hoạch"
            visible={isOpen}
            width={700}
            onCancel={handleCancel}
            onOk={handleOk}
          >
            <div className="modal_calendar">
              <div
                className="df"
                style={{
                  alignItems: "center",
                  gap: 20,
                }}
              >
                <div
                  className="df"
                  style={{
                    flex: 1,
                  }}
                >
                  <p>Việc cần làm:</p>
                  <Input
                    style={{ width: "70%" }}
                    placeholder="Việc cần làm"
                    value={content}
                    onChange={(e) => {
                      setContent(e.target.value);
                    }}
                  />
                </div>
                <div className="df">
                  <p>Chọn kiểu:</p>
                  <Select
                    defaultValue="success"
                    style={{
                      width: 120,
                    }}
                    onChange={handleChange}
                  >
                    <Option value="success">Giải trí</Option>
                    <Option value="warning">Học tập</Option>
                    <Option value="error">Khác</Option>
                  </Select>
                </div>
              </div>
              <div className="df" style={{ marginTop: 20 }}>
                <p>Chọn thời gian bắt đầu và kết thúc:</p>
                <TimePicker.RangePicker
                  placeholder={["Bắt đầu", "Kết thúc"]}
                  onChange={onChange}
                />
              </div>
            </div>
          </Modal>
        </div>
        <div className="calendar_container">
          {dataDay.map(({ content, date, type, startAt, endAt }) => (
            <CalendarItem
              content={content}
              date={date}
              type={type}
              startAt={startAt}
              endAt={endAt}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Calendars;
