import React, { useEffect, useState } from "react";
import "./Courses.css";
import { Empty, Tabs } from "antd";
import CourseItem from "../../components/CourseItem/CourseItem";
import { useContext } from "react";
import { CourseContext } from "../../contexts/courseContext/CourseContext";
import { getCourses } from "../../contexts/courseContext/apiCalls";
import { AuthContext } from "../../contexts/authContext/AuthContext";
import JoinClass from "../../components/JoinClass/JoinClass";
const { TabPane } = Tabs;

function Courses() {
  const [isLoading, setLoading] = useState(false);
  const { courses, dispatch } = useContext(CourseContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getCourses(user._id, dispatch);
  }, [user._id, dispatch, isLoading]);

  return (
    <div className="courses">
      <Tabs defaultActiveKey="1">
        <TabPane className="tabpane" tab="Toàn bộ khóa học" key="1">
          {courses.map(({ className, section, _id }) => (
            <CourseItem
              id={_id}
              classname={className}
              section={section}
              isLoading={isLoading}
              setLoading={setLoading}
            />
          ))}
        </TabPane>
        <JoinClass />
      </Tabs>
      {courses.length === 0 && <Empty description="Bạn chưa có lớp học nào " />}
    </div>
  );
}

export default Courses;
