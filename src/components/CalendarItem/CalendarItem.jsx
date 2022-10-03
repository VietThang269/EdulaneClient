import { Badge } from "antd";
import React from "react";
import "./CalendarItem.css";

function CalendarItem({ content, date, type, startAt, endAt }) {
  var color = "";
  switch (type) {
    case "success":
      color = "#dfffe3";
      break;
    case "warning":
      color = "#fff9d9";
      break;
    case "error":
      color = "#ffe8f3";
      break;
  }
  console.log(type, content, color);

  return (
    <div
      className="calendar_item"
      style={{
        backgroundColor: color,
      }}
    >
      <p className="calendar_time">
        {startAt} - {endAt}
      </p>
      {content}
    </div>
  );
}

export default CalendarItem;
