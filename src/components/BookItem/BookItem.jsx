import React from "react";
import { Button } from "antd";
import "./BookItem.css";
import { ArrowDownOutlined } from "@ant-design/icons";

function BookItem({ title, img, url, author, desc }) {
  return (
    <div className="book_item">
      <div className="book_img">
        <img src={img} alt="" />
      </div>
      <div className="book_info">
        <p>{title}</p>
        <p>by {author}</p>
      </div>
      <div className="book_dowload">
        <a href={url} target="blank">
          <Button type="primary">
            <ArrowDownOutlined />
            Tải về
          </Button>
        </a>
      </div>
    </div>
  );
}

export default BookItem;
