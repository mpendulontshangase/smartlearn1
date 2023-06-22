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

const HomeworkMark: React.FC = () => {
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
  const { Search } = Input;

  return (
    <>
      <Button style={{backgroundColor:"green"}} type="primary" onClick={showModal}>
        Upload Homework Mark
      </Button>
      <Modal
        title="Homework Mark"
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
            <Search
              placeholder="input search text"
              allowClear
              enterButton="Search"
              size="large"
            //   onSearch={onSearch}
            />

            <Form.Item label="Upload Script" name="upload">
              <Upload>
                <Button>Click to Upload</Button>
              </Upload>
            </Form.Item>
            <Form.Item
              label="Mark"
              name="description"
            >
              <InputNumber />
            </Form.Item>
            <Form.Item label="description" name="description">
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

export default HomeworkMark;
