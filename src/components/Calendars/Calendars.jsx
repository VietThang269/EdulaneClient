import React from "react";
import { Calendar } from "antd";
import "./Calendars.css";
function Calendars() {
  return (
    <div className="calendars">
      <p className="title">Lịch</p>

      <Calendar fullscreen={false} />
    </div>
  );
}

export default Calendars;
