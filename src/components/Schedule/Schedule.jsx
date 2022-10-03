import React, { useEffect, useState } from "react";
import ScheduleItem from "./ScheduleItem/ScheduleItem";
import "./Schedule.css";
import axios from "axios";
import { apiUrl } from "../../constants";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext/AuthContext";
import { Link } from "react-router-dom";
import { Empty } from "antd";

function Schedule() {
  const [data, setData] = useState();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getAllSchedule = async () => {
      const res = await axios.get(`${apiUrl}calendar/get_data/${user._id}`);
      setData(res.data);
      console.log(res);
    };
    getAllSchedule();
  }, [user._id]);

  data?.splice(3);

  return (
    <div className="schedule">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <p className="title">Kế hoạch</p>
        <Link to="/calendars">
          <p
            className="title_p"
            style={{
              margin: 0,
              fontSize: 14,
              margin: "10px 0 0 10px",
            }}
          >
            Xem tất cả
          </p>
        </Link>
      </div>
      {data?.map(({ content, date, startAt, endAt }, index) => (
        <ScheduleItem
          index={index}
          content={content}
          date={date}
          startAt={startAt}
          endAt={endAt}
        />
      ))}
      {data?.length === 0 && <Empty description="Bạn chưa có kế hoạch nào" />}
    </div>
  );
}

export default Schedule;
