import React, { useEffect, useRef, useState } from "react";
import "./ChatBox.css";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";
import axios from "axios";
import { apiUrl } from "../../constants";
import { Avatar, Button } from "antd";

function ChatBox({ chat, currentUser, setSendMessage, receivedMessage }) {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scroll = useRef();
  const imageRef = useRef();

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser);
    const getUserData = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}users/${userId}`);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) getUserData();
  }, [chat, currentUser]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}message/${chat._id}`);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) fetchMessages();
  }, [chat]);

  // Always scroll to last Message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
    };
    const receiverId = chat.members.find((id) => id !== currentUser);
    // send message to socket server
    setSendMessage({ ...message, receiverId });
    // send message to database
    try {
      const { data } = await axios.post(`${apiUrl}message`, message);
      console.log("dat", data);
      setMessages([...messages, data]);
      setNewMessage("");
    } catch {
      console.log("error");
    }
  };

  // Receive Message from parent component
  useEffect(() => {
    console.log("Message Arrived: ", receivedMessage);
    if (receivedMessage !== null && receivedMessage.chatId === chat?._id) {
      setMessages([...messages, receivedMessage]);
    }
  }, [receivedMessage]);
  return (
    <div className="chat_box">
      {chat ? (
        <>
          <div className="chat-header">
            <div className="follower">
              <div
                style={{ display: "flex", alignItems: "center", gap: "1rem" }}
              >
                <Avatar
                  style={{
                    color: "#f56a00",
                    backgroundColor: "#fde3cf",
                    width: "35px",
                    height: "35px",
                  }}
                >
                  {userData?.universityId}
                </Avatar>
                <div className="info">
                  <p className="info-name">{userData?.fullName}</p>
                  <p className="info-position">
                    {userData?.isTeacher ? "Giảng viên" : "Sinh viên"}
                  </p>
                </div>
              </div>
            </div>
            <hr
              style={{
                width: "95%",
                border: "0.1px solid #ececec",
                marginTop: "20px",
              }}
            />
          </div>
          <div className="chat-body">
            {messages.map((message) => (
              <>
                <div
                  ref={scroll}
                  className={
                    message.senderId === currentUser ? "message own" : "message"
                  }
                >
                  <span>{message.text}</span>{" "}
                  <span>{format(message.createdAt)}</span>
                </div>
              </>
            ))}
          </div>
          <div className="chat-sender">
            <InputEmoji
              value={newMessage}
              onChange={handleChange}
              placeholder="Hãy viết gì đó..."
            />
            <Button type="primary" onClick={handleSend}>
              Gửi
            </Button>
          </div>
        </>
      ) : (
        <span className="chatbox-empty-message">
          Hãy chọn người bạn muốn nhắn tin...
        </span>
      )}
    </div>
  );
}

export default ChatBox;
