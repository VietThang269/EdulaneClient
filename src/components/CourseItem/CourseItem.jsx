import React, { useState } from "react";
import "./CourseItem.css";
import { Button, Card, Input, Modal, Popconfirm, Popover } from "antd";
import { Progress } from "antd";
import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext/AuthContext";
import { DownOutlined, MoreOutlined } from "@ant-design/icons";
import axios from "axios";
import { apiUrl } from "../../constants";

function CourseItem({ id, classname, section, isLoading, setLoading }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [className, setClassName] = useState(classname);
  const [section1, setSection1] = useState(section);

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleTest = (e) => {
    console.log(e.target.id);
  };

  const { user } = useContext(AuthContext);

  const hanldeDeleteCourse = async () => {
    const res = await axios.delete(`${apiUrl}classes/${id}`);
    if (res) setLoading(!isLoading);
  };

  const hanldeUpdateClass = async () => {
    const res = await axios.put(`${apiUrl}classes/update/${id}`, {
      className: className,
      section: section1,
    });
    if (res) setLoading(!isLoading);
  };
  return (
    <div className="course_item">
      <div className="course_item-img">
        <img
          src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNzgiIGhlaWdodD0iMjA1Ij48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJyZ2IoMTA4LCA5MiwgMjMxKSIgLz48cmVjdCB4PSItMTguODMzMzMzMzMzMzMzIiB5PSItMTguODMzMzMzMzMzMzMzIiB3aWR0aD0iMzcuNjY2NjY2NjY2NjY3IiBoZWlnaHQ9IjM3LjY2NjY2NjY2NjY2NyIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utb3BhY2l0eT0iMC4wMiIgZmlsbD0iI2RkZCIgZmlsbC1vcGFjaXR5PSIwLjE0MTMzMzMzMzMzMzMzIiBzdHJva2Utd2lkdGg9IjEiIC8+PHJlY3QgeD0iMTU5LjQwNzI0NzA4NTA5IiB5PSItMTguODMzMzMzMzMzMzMzIiB3aWR0aD0iMzcuNjY2NjY2NjY2NjY3IiBoZWlnaHQ9IjM3LjY2NjY2NjY2NjY2NyIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utb3BhY2l0eT0iMC4wMiIgZmlsbD0iI2RkZCIgZmlsbC1vcGFjaXR5PSIwLjE0MTMzMzMzMzMzMzMzIiBzdHJva2Utd2lkdGg9IjEiIC8+PHJlY3QgeD0iLTE4LjgzMzMzMzMzMzMzMyIgeT0iMTg2Ljk4MTE2MDgzNjg2IiB3aWR0aD0iMzcuNjY2NjY2NjY2NjY3IiBoZWlnaHQ9IjM3LjY2NjY2NjY2NjY2NyIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utb3BhY2l0eT0iMC4wMiIgZmlsbD0iI2RkZCIgZmlsbC1vcGFjaXR5PSIwLjE0MTMzMzMzMzMzMzMzIiBzdHJva2Utd2lkdGg9IjEiIC8+PHJlY3QgeD0iMTU5LjQwNzI0NzA4NTA5IiB5PSIxODYuOTgxMTYwODM2ODYiIHdpZHRoPSIzNy42NjY2NjY2NjY2NjciIGhlaWdodD0iMzcuNjY2NjY2NjY2NjY3IiBzdHJva2U9IiMwMDAiIHN0cm9rZS1vcGFjaXR5PSIwLjAyIiBmaWxsPSIjZGRkIiBmaWxsLW9wYWNpdHk9IjAuMTQxMzMzMzMzMzMzMzMiIHN0cm9rZS13aWR0aD0iMSIgLz48cmVjdCB4PSI3MC4yODY5NTY4NzU4ODEiIHk9IjMyLjYyMDI5MDIwOTIxNCIgd2lkdGg9IjM3LjY2NjY2NjY2NjY2NyIgaGVpZ2h0PSIzNy42NjY2NjY2NjY2NjciIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMDIiIGZpbGw9IiNkZGQiIGZpbGwtb3BhY2l0eT0iMC4xMjQiIHN0cm9rZS13aWR0aD0iMSIgLz48cmVjdCB4PSItMTguODMzMzMzMzMzMzMzIiB5PSI4NC4wNzM5MTM3NTE3NjEiIHdpZHRoPSIzNy42NjY2NjY2NjY2NjciIGhlaWdodD0iMzcuNjY2NjY2NjY2NjY3IiBzdHJva2U9IiMwMDAiIHN0cm9rZS1vcGFjaXR5PSIwLjAyIiBmaWxsPSIjMjIyIiBmaWxsLW9wYWNpdHk9IjAuMDI4NjY2NjY2NjY2NjY3IiBzdHJva2Utd2lkdGg9IjEiIC8+PHJlY3QgeD0iMTU5LjQwNzI0NzA4NTA5IiB5PSI4NC4wNzM5MTM3NTE3NjEiIHdpZHRoPSIzNy42NjY2NjY2NjY2NjciIGhlaWdodD0iMzcuNjY2NjY2NjY2NjY3IiBzdHJva2U9IiMwMDAiIHN0cm9rZS1vcGFjaXR5PSIwLjAyIiBmaWxsPSIjMjIyIiBmaWxsLW9wYWNpdHk9IjAuMDI4NjY2NjY2NjY2NjY3IiBzdHJva2Utd2lkdGg9IjEiIC8+PHJlY3QgeD0iNzAuMjg2OTU2ODc1ODgxIiB5PSIxMzUuNTI3NTM3Mjk0MzEiIHdpZHRoPSIzNy42NjY2NjY2NjY2NjciIGhlaWdodD0iMzcuNjY2NjY2NjY2NjY3IiBzdHJva2U9IiMwMDAiIHN0cm9rZS1vcGFjaXR5PSIwLjAyIiBmaWxsPSIjZGRkIiBmaWxsLW9wYWNpdHk9IjAuMDIiIHN0cm9rZS13aWR0aD0iMSIgLz48cG9seWxpbmUgcG9pbnRzPSIwLCAwLCAzMi42MjAyOTAyMDkyMTQsIDE4LjgzMzMzMzMzMzMzMywgMCwgMzcuNjY2NjY2NjY2NjY3LCAwLCAwIiBzdHJva2U9IiMwMDAiIHN0cm9rZS1vcGFjaXR5PSIwLjAyIiBmaWxsPSIjMjIyIiBmaWxsLW9wYWNpdHk9IjAuMTE1MzMzMzMzMzMzMzMiIHN0cm9rZS13aWR0aD0iMSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTguODMzMzMzMzMzMzMzLCAtMTguODMzMzMzMzMzMzMzKSByb3RhdGUoMCwgMTguODMzMzMzMzMzMzMzLCAxNi4zMTAxNDUxMDQ2MDcpIiAvPjxwb2x5bGluZSBwb2ludHM9IjAsIDAsIDMyLjYyMDI5MDIwOTIxNCwgMTguODMzMzMzMzMzMzMzLCAwLCAzNy42NjY2NjY2NjY2NjcsIDAsIDAiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMDIiIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4xMTUzMzMzMzMzMzMzMyIgc3Ryb2tlLXdpZHRoPSIxIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxOC44MzMzMzMzMzMzMzMsIDIyNC42NDc4Mjc1MDM1Mikgcm90YXRlKDAsIDE4LjgzMzMzMzMzMzMzMywgMTYuMzEwMTQ1MTA0NjA3KSBzY2FsZSgxLCAtMSkiIC8+PHBvbHlsaW5lIHBvaW50cz0iMCwgMCwgMzIuNjIwMjkwMjA5MjE0LCAxOC44MzMzMzMzMzMzMzMsIDAsIDM3LjY2NjY2NjY2NjY2NywgMCwgMCIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utb3BhY2l0eT0iMC4wMiIgZmlsbD0iI2RkZCIgZmlsbC1vcGFjaXR5PSIwLjA1NDY2NjY2NjY2NjY2NyIgc3Ryb2tlLXdpZHRoPSIxIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNTkuNDA3MjQ3MDg1MDksIC0xOC44MzMzMzMzMzMzMzMpIHJvdGF0ZSgwLCAxOC44MzMzMzMzMzMzMzMsIDE2LjMxMDE0NTEwNDYwNykgc2NhbGUoLTEsIDEpIiAvPjxwb2x5bGluZSBwb2ludHM9IjAsIDAsIDMyLjYyMDI5MDIwOTIxNCwgMTguODMzMzMzMzMzMzMzLCAwLCAzNy42NjY2NjY2NjY2NjcsIDAsIDAiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMDIiIGZpbGw9IiNkZGQiIGZpbGwtb3BhY2l0eT0iMC4wNTQ2NjY2NjY2NjY2NjciIHN0cm9rZS13aWR0aD0iMSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTU5LjQwNzI0NzA4NTA5LCAyMjQuNjQ3ODI3NTAzNTIpIHJvdGF0ZSgwLCAxOC44MzMzMzMzMzMzMzMsIDE2LjMxMDE0NTEwNDYwNykgc2NhbGUoLTEsIC0xKSIgLz48cG9seWxpbmUgcG9pbnRzPSIwLCAwLCAzMi42MjAyOTAyMDkyMTQsIDE4LjgzMzMzMzMzMzMzMywgMCwgMzcuNjY2NjY2NjY2NjY3LCAwLCAwIiBzdHJva2U9IiMwMDAiIHN0cm9rZS1vcGFjaXR5PSIwLjAyIiBmaWxsPSIjMjIyIiBmaWxsLW9wYWNpdHk9IjAuMDgwNjY2NjY2NjY2NjY3IiBzdHJva2Utd2lkdGg9IjEiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEwNy45NTM2MjM1NDI1NSwgMzIuNjIwMjkwMjA5MjE0KSIgLz48cG9seWxpbmUgcG9pbnRzPSIwLCAwLCAzMi42MjAyOTAyMDkyMTQsIDE4LjgzMzMzMzMzMzMzMywgMCwgMzcuNjY2NjY2NjY2NjY3LCAwLCAwIiBzdHJva2U9IiMwMDAiIHN0cm9rZS1vcGFjaXR5PSIwLjAyIiBmaWxsPSIjZGRkIiBmaWxsLW9wYWNpdHk9IjAuMDg5MzMzMzMzMzMzMzMzIiBzdHJva2Utd2lkdGg9IjEiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDcwLjI4Njk1Njg3NTg4MSwgMzIuNjIwMjkwMjA5MjE0KSBzY2FsZSgtMSwgMSkiIC8+PHBvbHlsaW5lIHBvaW50cz0iMCwgMCwgMzIuNjIwMjkwMjA5MjE0LCAxOC44MzMzMzMzMzMzMzMsIDAsIDM3LjY2NjY2NjY2NjY2NywgMCwgMCIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utb3BhY2l0eT0iMC4wMiIgZmlsbD0iI2RkZCIgZmlsbC1vcGFjaXR5PSIwLjA1NDY2NjY2NjY2NjY2NyIgc3Ryb2tlLXdpZHRoPSIxIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMDcuOTUzNjIzNTQyNTUsIDE3My4xOTQyMDM5NjA5Nykgc2NhbGUoMSwgLTEpIiAvPjxwb2x5bGluZSBwb2ludHM9IjAsIDAsIDMyLjYyMDI5MDIwOTIxNCwgMTguODMzMzMzMzMzMzMzLCAwLCAzNy42NjY2NjY2NjY2NjcsIDAsIDAiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMDIiIGZpbGw9IiNkZGQiIGZpbGwtb3BhY2l0eT0iMC4wODkzMzMzMzMzMzMzMzMiIHN0cm9rZS13aWR0aD0iMSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNzAuMjg2OTU2ODc1ODgxLCAxNzMuMTk0MjAzOTYwOTcpIHNjYWxlKC0xLCAtMSkiIC8+PHBvbHlsaW5lIHBvaW50cz0iMCwgMCwgMzIuNjIwMjkwMjA5MjE0LCAxOC44MzMzMzMzMzMzMzMsIDAsIDM3LjY2NjY2NjY2NjY2NywgMCwgMCIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utb3BhY2l0eT0iMC4wMiIgZmlsbD0iIzIyMiIgZmlsbC1vcGFjaXR5PSIwLjA0NiIgc3Ryb2tlLXdpZHRoPSIxIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxOC44MzMzMzMzMzMzMzMsIDg0LjA3MzkxMzc1MTc2MSkiIC8+PHBvbHlsaW5lIHBvaW50cz0iMCwgMCwgMzIuNjIwMjkwMjA5MjE0LCAxOC44MzMzMzMzMzMzMzMsIDAsIDM3LjY2NjY2NjY2NjY2NywgMCwgMCIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utb3BhY2l0eT0iMC4wMiIgZmlsbD0iIzIyMiIgZmlsbC1vcGFjaXR5PSIwLjEzMjY2NjY2NjY2NjY3IiBzdHJva2Utd2lkdGg9IjEiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE1OS40MDcyNDcwODUwOSwgODQuMDczOTEzNzUxNzYxKSBzY2FsZSgtMSwgMSkiIC8+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjM3LjY2NjY2NjY2NjY2NyIgaGVpZ2h0PSIzNy42NjY2NjY2NjY2NjciIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMDIiIGZpbGw9IiNkZGQiIGZpbGwtb3BhY2l0eT0iMC4wODkzMzMzMzMzMzMzMzMiIHN0cm9rZS13aWR0aD0iMSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTguODMzMzMzMzMzMzMzLCAxOC44MzMzMzMzMzMzMzMpIHJvdGF0ZSgtMzAsIDAsIDApIiAvPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIzNy42NjY2NjY2NjY2NjciIGhlaWdodD0iMzcuNjY2NjY2NjY2NjY3IiBzdHJva2U9IiMwMDAiIHN0cm9rZS1vcGFjaXR5PSIwLjAyIiBmaWxsPSIjZGRkIiBmaWxsLW9wYWNpdHk9IjAuMDM3MzMzMzMzMzMzMzMzIiBzdHJva2Utd2lkdGg9IjEiIHRyYW5zZm9ybT0ic2NhbGUoLTEsIDEpIHRyYW5zbGF0ZSgtMTU5LjQwNzI0NzA4NTA5LCAxOC44MzMzMzMzMzMzMzMpIHJvdGF0ZSgtMzAsIDAsIDApIiAvPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIzNy42NjY2NjY2NjY2NjciIGhlaWdodD0iMzcuNjY2NjY2NjY2NjY3IiBzdHJva2U9IiMwMDAiIHN0cm9rZS1vcGFjaXR5PSIwLjAyIiBmaWxsPSIjMjIyIiBmaWxsLW9wYWNpdHk9IjAuMDgwNjY2NjY2NjY2NjY3IiBzdHJva2Utd2lkdGg9IjEiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE4LjgzMzMzMzMzMzMzMywgNDYuNDA3MjQ3MDg1MDk0KSByb3RhdGUoMzAsIDAsIDM3LjY2NjY2NjY2NjY2NykiIC8+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjM3LjY2NjY2NjY2NjY2NyIgaGVpZ2h0PSIzNy42NjY2NjY2NjY2NjciIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMDIiIGZpbGw9IiNkZGQiIGZpbGwtb3BhY2l0eT0iMC4wODkzMzMzMzMzMzMzMzMiIHN0cm9rZS13aWR0aD0iMSIgdHJhbnNmb3JtPSJzY2FsZSgtMSwgMSkgdHJhbnNsYXRlKC0xNTkuNDA3MjQ3MDg1MDksIDQ2LjQwNzI0NzA4NTA5NCkgcm90YXRlKDMwLCAwLCAzNy42NjY2NjY2NjY2NjcpIiAvPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIzNy42NjY2NjY2NjY2NjciIGhlaWdodD0iMzcuNjY2NjY2NjY2NjY3IiBzdHJva2U9IiMwMDAiIHN0cm9rZS1vcGFjaXR5PSIwLjAyIiBmaWxsPSIjZGRkIiBmaWxsLW9wYWNpdHk9IjAuMDcyIiBzdHJva2Utd2lkdGg9IjEiIHRyYW5zZm9ybT0ic2NhbGUoMSwgLTEpIHRyYW5zbGF0ZSgxOC44MzMzMzMzMzMzMzMsIC0xNTkuNDA3MjQ3MDg1MDkpIHJvdGF0ZSgzMCwgMCwgMzcuNjY2NjY2NjY2NjY3KSIgLz48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMzcuNjY2NjY2NjY2NjY3IiBoZWlnaHQ9IjM3LjY2NjY2NjY2NjY2NyIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utb3BhY2l0eT0iMC4wMiIgZmlsbD0iIzIyMiIgZmlsbC1vcGFjaXR5PSIwLjA5OCIgc3Ryb2tlLXdpZHRoPSIxIiB0cmFuc2Zvcm09InNjYWxlKC0xLCAtMSkgdHJhbnNsYXRlKC0xNTkuNDA3MjQ3MDg1MDksIC0xNTkuNDA3MjQ3MDg1MDkpIHJvdGF0ZSgzMCwgMCwgMzcuNjY2NjY2NjY2NjY3KSIgLz48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMzcuNjY2NjY2NjY2NjY3IiBoZWlnaHQ9IjM3LjY2NjY2NjY2NjY2NyIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utb3BhY2l0eT0iMC4wMiIgZmlsbD0iIzIyMiIgZmlsbC1vcGFjaXR5PSIwLjA2MzMzMzMzMzMzMzMzMyIgc3Ryb2tlLXdpZHRoPSIxIiB0cmFuc2Zvcm09InNjYWxlKDEsIC0xKSB0cmFuc2xhdGUoMTguODMzMzMzMzMzMzMzLCAtMTg2Ljk4MTE2MDgzNjg2KSByb3RhdGUoLTMwLCAwLCAwKSIgLz48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMzcuNjY2NjY2NjY2NjY3IiBoZWlnaHQ9IjM3LjY2NjY2NjY2NjY2NyIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utb3BhY2l0eT0iMC4wMiIgZmlsbD0iI2RkZCIgZmlsbC1vcGFjaXR5PSIwLjEwNjY2NjY2NjY2NjY3IiBzdHJva2Utd2lkdGg9IjEiIHRyYW5zZm9ybT0ic2NhbGUoLTEsIC0xKSB0cmFuc2xhdGUoLTE1OS40MDcyNDcwODUwOSwgLTE4Ni45ODExNjA4MzY4Nikgcm90YXRlKC0zMCwgMCwgMCkiIC8+PC9zdmc+"
          alt=""
        />
      </div>
      <div className="course_item-title ">
        <div className="title-decs">
          <p
            className="truncate"
            style={{ color: "rgba(0, 0, 0, 0.85)", fontWeight: 600 }}
          >
            {classname}
          </p>
          <p
            className="truncate"
            style={{
              color: "rgba(0, 0, 0, 0.45)",
              fontSize: 14,
              lineHeight: 1.5715,
            }}
          >
            {section}
          </p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: "5%",
        }}
      >
        <Link
          to={`/courses/${id}`}
          style={{ width: "90%", color: "var(--main-color)" }}
        >
          <Button onClick={handleTest} style={{ width: "100%" }}>
            {user.isTeacher ? "Truy cập" : "Học"}
          </Button>
        </Link>
      </div>
      {user?.isTeacher && (
        <div className="course_option">
          <Popover
            zIndex={1}
            placement="bottom"
            content={
              <div className="course_option_inner">
                <p className="course_update" onClick={showModal}>
                  Chỉnh sửa
                </p>
                <Modal
                  title="Chỉnh sửa lớp học"
                  visible={isModalVisible}
                  onCancel={handleCancel}
                  okText="Chỉnh sửa"
                  onOk={hanldeUpdateClass}
                  cancelText="Đóng"
                >
                  <p style={{ marginBottom: 10 }}>Tên lớp</p>
                  <Input
                    style={{ borderRadius: 0, marginBottom: 10 }}
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                  />
                  <p style={{ marginBottom: 10 }}>Môn học</p>
                  <Input
                    style={{ borderRadius: 0 }}
                    value={section1}
                    onChange={(e) => setSection1(e.target.value)}
                  />
                </Modal>

                <Popconfirm
                  title="Bạn có chắc muốn xóa lớp này không ?"
                  onConfirm={hanldeDeleteCourse}
                  okText="Có"
                  cancelText="Không"
                >
                  <p className="course_delete">Xóa</p>
                </Popconfirm>
              </div>
            }
            trigger="click"
          >
            <MoreOutlined
              style={{
                color: "white",
                fontSize: 30,
              }}
            />
          </Popover>
        </div>
      )}
    </div>
  );
}

export default CourseItem;
