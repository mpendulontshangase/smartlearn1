import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Empty,
  Select,

  DatePicker,
} from "antd";

import styles from "./style.module.css";
import Link from "next/link";

import { useMessage } from "../../Providers/Messages";
import { IMessage } from "../../Providers/Messages/context";


const SendMessage = () => {
  const [open, setOpen] = useState<boolean>(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setOpen(false);
    console.log("I am clicked as a Saved");
  };

  const handleCancel = () => {
    console.log("I am clicked as a cancel");
    setOpen(false);
  };

  const { CreateMessage, Create } = useMessage();

  useEffect(() => {
    if (Create !== null) {
      console.log(Create);
    }
  }, []);

  const onFinish = (values: IMessage) => {
    console.log("Form values:", values);
    if (CreateMessage) {
      CreateMessage(values);
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
        title="Add New SendMessage"
        visible={open}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" htmlType="submit" type="primary" form="myForm">
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
            <Form.Item name="subject">
              <Select>
                <Option value="8">8</Option>
                <Option value="9">9</Option>
                <Option value="10">10</Option>
                <Option value="11">11</Option>
                <Option value="12">12</Option>
              </Select>
            </Form.Item>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Subject<span className={styles.required}></span>
            </label>
            <Form.Item name="subject">
              <Select>
                <Option value="8">isiZulu</Option>
                <Option value="9">English</Option>
                <Option value="10">Mathematics</Option>
                <Option value="11">LO</Option>
                <Option value="12">Social Sciences</Option>
                <Option value="13">Life Sciences</Option>
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
