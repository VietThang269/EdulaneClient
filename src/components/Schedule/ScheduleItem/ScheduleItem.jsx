import React from "react";
import "./ScheduleItem.css";

function ScheduleItem({ content, date, startAt, endAt, index }) {
  return (
    <div className="schedule_item">
      <div className="schedule_item-title">
        <div className="number">{index + 1}</div>
        <div className="schedule_item-content">
          <p className="item-title">{content}</p>
          <p className="sub-title">{date}</p>
        </div>
      </div>
      <div className="schedule_item-time">
        {startAt} <br /> {endAt}
      </div>
    </div>
  );
}

export default ScheduleItem;
