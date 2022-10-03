import React from "react";
import Assignment from "./Assignment/Assignment";
import "./Assignments.css";
import moment from "moment";

function Assignments() {
  const data = [
    {
      dueDate: "30-09-2022 11:00 AM",
    },

    {
      dueDate: "30-09-2022 12:00 AM",
    },

    {
      dueDate: "30-09-2022 13:00 AM",
    },
    {
      dueDate: "30-09-2022 14:00 AM",
    },
  ];
  data.sort((a, b) =>
    moment(a.dueDate, "DD-MM-YYYY").isBefore(moment(b.dueDate, "DD-MM-YYYY"))
      ? 1
      : -1
  );
  data.splice(3);
  return (
    <div className="assignments">
      <p className="title">Assignments</p>
      {data.map(({ dueDate }) => (
        <Assignment dueDate={dueDate} />
      ))}
    </div>
  );
}

export default Assignments;
