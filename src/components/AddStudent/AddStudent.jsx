import { Button, Select } from "antd";
import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { apiUrl } from "../../constants";
import "./AddStudent.css";
import { AuthContext } from "../../contexts/authContext/AuthContext";
import { useParams } from "react-router-dom";

const { Option } = Select;

function AddStudent({ id, detail, isLoading, setLoading }) {
  const children = [];
  const [student, setStudent] = useState();
  const [data, setData] = useState([]);
  const { user } = useContext(AuthContext);
  const member = detail?.member?.map((item) => item.memberId);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(`${apiUrl}users/getall/${user._id}`);
      setData(res.data);
    }
    fetchData();
  }, []);

  const handleChange = (value) => {
    setStudent(value);
  };

  data.map((item, index) => {
    if (!member?.includes(item._id))
      children.push(<Option key={item._id}>{item.userName}</Option>);
  });

  const addMember = async () => {
    console.log("Hi");
    const res = await axios.put(`${apiUrl}classes/add`, {
      user: student,
      classId: id,
    });
    setStudent([]);
    setLoading(!isLoading);
  };

  return (
    <>
      <Select
        mode="multiple"
        allowClear
        style={{
          width: "100%",
        }}
        placeholder="Hãy chọn sinh viên..."
        onChange={(value) => setStudent(value)}
        value={student}
      >
        {children}
      </Select>
      <Button type="primary" style={{ marginTop: 20 }} onClick={addMember}>
        Thêm sinh viên vào lớp
      </Button>
    </>
  );
}

export default AddStudent;
