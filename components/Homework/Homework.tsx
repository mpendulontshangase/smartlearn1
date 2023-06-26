import React, { useEffect, useRef, useState } from "react";

import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Upload,
} from "antd";
import { useHomework } from "../../Providers/Homework";
import { useTeacher } from "../../Providers/Teacher";
import styles from "./style.module.css";
import { InboxOutlined, PlusOutlined } from "@ant-design/icons";
import { IHomework } from "../../Providers/Homework/context";
import { useUser } from "../../Providers/User";

const Homework: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { getUserDetails, personInfo } = useUser();
  const [file, setFile] = useState(null)
  const [uploadedFile, setUploadedFile] = useState([]);
  const uploadRef = useRef(null);
  const { CreateHomework } = useHomework();
  // const [form] = Form.useForm();
  const { Dragger } = Upload;

 
  const handleFileChange = (info) => {
    if (info.fileList.length > 0) {
      const uploadedFile = info.fileList[0].originFileObj;
      setFile(uploadedFile);
    } else {
      setFile(null);
    }
  };

  // const teacher_Id =personInfo



  const onFinish = (values) => {
    const { teacher_Id, ...restValues } = values; 
  
    const formData = new FormData();
    formData.append("grade", restValues.grade);
    formData.append("teacher_Id", teacher_Id);
    formData.append("subject", restValues.subject);
    formData.append("homeworkDescription", restValues.homeworkDescription);
    formData.append("due_Date", restValues.due_Date.toISOString());
    formData.append("file", restValues.file[0]);
  

    CreateHomework(formData);
  };
  
  
  
  
  const onFinishFailed = (errorInfo) => {
   
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        style={{ backgroundColor: "green" }}
        type="primary"
        onClick={showModal}
      >
        Add Homework
      </Button>
      <Modal
        title="Homework"
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
           
          >
            <Form.Item label="Grade" name="grade">
              <Select>
                <Select.Option value="8">8</Select.Option>
                <Select.Option value="9">9</Select.Option>
                <Select.Option value="10">10</Select.Option>
                <Select.Option value="11">11</Select.Option>
                <Select.Option value="12">12</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Subject" name="subject">
              <Select>
                <Select.Option value="English">English</Select.Option>
                <Select.Option value="IsiZulu">IsiZulu</Select.Option>
                <Select.Option value="Mathematics">Mathematics</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Due Date" name="due_Date">
              <DatePicker />
            </Form.Item>
            <Form.Item
            name="file"
            rules={[{ required: true, message: 'Please upload an image' }]}
          >
            <Dragger
              beforeUpload={() => false} // Prevent default upload behavior
              onChange={handleFileChange}
              fileList={file ? [file] : []}
            >
              <p className="ant-upload-drag-icon">
                {/* Add an upload icon */}
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
            </Dragger>
          </Form.Item>
            <Form.Item label="description" name="homeworkDescription">
              <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default Homework;
