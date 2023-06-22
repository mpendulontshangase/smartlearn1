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
import { PlusOutlined } from "@ant-design/icons";
import { IHomework } from "../../Providers/Homework/context";

const Homework: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teacherId, setTeacherId] = useState(
    "002771c4-40ed-4271-bfc5-08db708d45f9"
  );
  const [fileList, setFileList] = useState([]);
  const [uploadedFile, setUploadedFile] = useState([]);
  const uploadRef = useRef(null);
  const { CreateHomework } = useHomework();

  const handleBeforeUpload = (file) => {
    setFileList([]);
    setUploadedFile(file);
    return false;
  };

  const handleUpload = ({ file }) => {
    if (file.status !== "uploading") {
      setUploadedFile(file);
    }
  };

  const { ViewbyUserIdTeacher } = useTeacher();

  useEffect(() => {
   
  }, []);

  const onFinish = (values:IHomework) => {
    const formData = new FormData();

    formData.append("teacher_Id", String(values.teacher_Id));
    formData.append("homeworkDescription", String(values.homeworkDescription));
    formData.append("due_Date", String(values.due_Date));
    formData.append("subject", String(values.subject));
    formData.append("grade", String(values.grade));
    formData.append("id", String(values.id));
 

    const fileList = uploadRef.current.fileList;
    if (fileList.length > 0) {
      const file = fileList[0];
      formData.append("file", file);
    }

  
    // CreateHomework(formData);
    console.log("Success:", formData);
   
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
            <Form.Item label="Upload" name="upload">
              <Upload
                name="image"
                listType="picture-card"
                className={styles.upload}
                showUploadList={{ showPreviewIcon: false }}
                beforeUpload={handleBeforeUpload}
                onChange={handleUpload}
                ref={uploadRef}
               
                fileList={fileList}
              >
                <div>
                  <PlusOutlined />
                  <div className="ant-upload-text">Upload</div>
                </div>
              </Upload>
            </Form.Item>
            <Form.Item label="description" name="homeworkDescription">
              <Input  />
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
