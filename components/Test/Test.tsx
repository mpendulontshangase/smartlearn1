import React, { useState } from "react";
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

const Test: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onFinish = (values) => {
    console.log("Success:", values);
    // Perform upload logic here
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
      <Button style={{backgroundColor:"green"}} type="primary" onClick={showModal}>
        Add Test
      </Button>
      <Modal
        title="Test"
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
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
            <Form.Item label="Test Date" name="testDate">
              <DatePicker />
            </Form.Item>
            <Form.Item label="Test Scope" name="upload">
              <Upload>
                <Button>Click to Upload</Button>
              </Upload>
            </Form.Item>
            
            <Form.Item
              label="description"
              name="description"
            >
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

export default Test;
