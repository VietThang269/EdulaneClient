import React, { useEffect } from "react";
import "./CoursesAdmin.css";
import { Empty, Tabs } from "antd";
import CourseItem from "../../components/CourseItem/CourseItem";
import JoinClass from "../../components/JoinClass/JoinClass";
import { useContext } from "react";
import { CourseContext } from "../../contexts/courseContext/CourseContext";
import { getCoursesAdmin } from "../../contexts/courseContext/apiCalls";
import { AuthContext } from "../../contexts/authContext/AuthContext";
import CreateClass from "../../components/CreateClass/CreateClass";

const { TabPane } = Tabs;

const onChange = (key) => {
  console.log(key);
};

function CoursesAdmin() {
  const { courses, dispatch } = useContext(CourseContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const id = user._id;
    getCoursesAdmin(id, dispatch);
  }, [dispatch]);

  return (
    <div className="courses_admin">
      <Tabs defaultActiveKey="1" onChange={onChange}>
        <TabPane className="tabpane" tab="Toàn bộ khóa học" key="1">
          {courses.map(({ className, section, _id }) => (
            <CourseItem id={_id} classname={className} section={section} />
          ))}
        </TabPane>
        <CreateClass />
      </Tabs>
      {courses.length === 0 && <Empty description="Bạn chưa có lớp học nào " />}
    </div>
  );
}

export default CoursesAdmin;
