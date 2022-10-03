import { Spin } from "antd";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import BookItem from "../../components/BookItem/BookItem";
import { apiUrl } from "../../constants";
import "./Library.css";

function Library() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const getBook = async () => {
      const res = await axios.get(`${apiUrl}book/`);
      console.log("user", res);
      setData(res.data);
    };
    getBook();
  }, []);

  return data ? (
    <div className="library">
      <div className="library_container">
        {data?.map(({ title, img, url, author, desc }) => (
          <BookItem
            title={title}
            img={img}
            url={url}
            author={author}
            desc={desc}
          />
        ))}
      </div>
    </div>
  ) : (
    <Spin />
  );
}

export default Library;
