import React, { useState } from "react";
import { Button, Modal, Form, Input, Select } from "antd";
import styles from "./style.module.css";
import { useMessage } from "../../Providers/Messages";
import { IMessage } from "../../Providers/Messages/context";

const SendMessage = () => {
  const [open, setOpen] = useState<boolean>(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const { CreateMessage } = useMessage();

  const onFinish = (values: IMessage) => {
    if (CreateMessage) {
      const selectedSubjects = values.subject || [];
      const messageWithSubjects = { ...values, subject: selectedSubjects };
      console.log(messageWithSubjects)
      CreateMessage(messageWithSubjects);
    }
    handleOk();
  };

  const { Option } = Select;

  return (
    <>
      <Button className={styles.button} onClick={showModal}>
        Send Message
      </Button>

      <Modal
        width={400}
        title="Add New Message"
        visible={open}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            htmlType="submit"
            type="primary"
            form="myForm"
          >
            Send
          </Button>,
        ]}
      >
        <Form
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 10 }}
          layout="horizontal"
          onFinish={onFinish}
          id="myForm"
        >
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Grade<span className={styles.required}></span>
            </label>
            <Form.Item name="grade">
              <Select placeholder="grade">
                <Option value={1}>8</Option>
                <Option value={2}>9</Option>
                <Option value={3}>10</Option>
                <Option value={4}>11</Option>
                <Option value={5}>12</Option>
              </Select>
            </Form.Item>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Subject<span className={styles.required}></span>
            </label>
            <Form.Item name="subject">
              <Select mode="multiple" placeholder="subject">
                <Option value={1}>isiZulu</Option>
                <Option value={2}>English</Option>
                <Option value={4}>Mathematics</Option>
                <Option value={8}>Life Orientation</Option>
                <Option value={16}>Technology</Option>
                <Option value={32}>NS</Option>
                <Option value={64}>EMS</Option>
              </Select>
            </Form.Item>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>
              <span className={styles.required}>*</span>
            </label>
            <Form.Item
              name="message_Description"
              rules={[
                {
                  required: true,
                  message: "Please type something",
                },
              ]}
            >
              <Input className={styles.textArea} />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default SendMessage;
