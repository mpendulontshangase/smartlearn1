import React, { useState, useEffect } from "react";
import styles from "./style.module.css";
import { Button, Input } from "antd";
import { DeleteOutlined, MessageOutlined } from "@ant-design/icons";
import { useMessage } from "../../Providers/Messages";
import Link from "next/link";

function MessagesComp() {
  const { ViewMessage, View, UpdateMessage } = useMessage();
  const [replyContents, setReplyContents] = useState({});

  useEffect(() => {
    ViewMessage();
  }, []);

  const handleReply = (messageId) => {
    setReplyContents((prevState) => ({
      ...prevState,
      [messageId]: "",
    }));
  };

  const handleReplyContentChange = (messageId, content) => {
    setReplyContents((prevState) => ({
      ...prevState,
      [messageId]: content,
    }));
  };

  const handleSendReply = (messageId, message) => {
    const replyContent = replyContents[messageId];
    if (replyContent) {
      const currentTime = new Date().toISOString();
      const messagePayload = {
        id: messageId,
        reply: replyContent,
        message_Description: message.message_Description,
        time_sent: currentTime,
      };

      UpdateMessage(messagePayload);

      setReplyContents((prevState) => {
        const newState = { ...prevState };
        delete newState[messageId];
        return newState;
      });
    }
  };

  const handleCancelReply = (messageId) => {
    setReplyContents((prevState) => {
      const newState = { ...prevState };
      delete newState[messageId];
      return newState;
    });
  };

  return (
    <>
      <Button>
        <Link href="/TeacherDashboard">Back</Link>
      </Button>
      <div>
        {View?.map((message) => (
          <div key={message.id} className={`${styles.message} ${styles.sender}`}>
            <div className={styles.content}>
              {message.message_Description}
              <Button
                type="primary"
                shape="circle"
                icon={<MessageOutlined />}
                size="small"
                onClick={() => handleReply(message.id)}
              />
            </div>
            {replyContents[message.id] !== undefined && (
              <div>
                <Input
                  value={replyContents[message.id]}
                  onChange={(e) =>
                    handleReplyContentChange(message.id, e.target.value)
                  }
                />
                <Button
                  type="primary"
                  onClick={() => handleSendReply(message.id, message)}
                >
                  Send
                </Button>
                <Button onClick={() => handleCancelReply(message.id)}>
                  Cancel
                </Button>
              </div>
            )}
            {message.reply && (
              <div className={`${styles.message} ${styles.reply}`}>
                {message.reply}
                <div className={styles.bathon}>
                  <DeleteOutlined />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default MessagesComp;
