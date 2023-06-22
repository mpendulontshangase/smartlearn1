import React, { useState } from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  SelectProps,
  Space,
} from "antd";
import Link from "next/link";
import styles from "./style.module.css";
import MultRef from "../Select";
import { useLearner } from "../../Providers/Learner";

const Learner: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  const {CreateLearner}=useLearner();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (selectedSubjects) => {
    setSelectedSubjects(selectedSubjects);
  };

  const calculateSelectedSubjectValue = () => {
    let sum = 0;
    selectedSubjects.forEach((subject) => {
      sum += subject;
    });
    return sum;
  };

  const onFinish = (values) => {
    const parent_Id = "42b57a67-c3e1-4636-5bc6-08db6cdd10c2"
    const subject = calculateSelectedSubjectValue();
    console.log("Form values:", values);
    console.log("Selected subjects:", selectedSubjects);
    const mergedValues = {...values,subject,parent_Id}
    console.log("Meeee:", mergedValues);



    CreateLearner(mergedValues)
    // Pass the selectedSubjectValue to the desired prop or perform other operations with it
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const options = [
    { label: "IsiZulu", value: 1 },
    { label: "English", value: 2 },
    { label: "Maths", value: 4 },
    // Add more options as needed
  ];

  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        style={{ backgroundColor: "green" }}
      >
        Add Learner
      </Button>
      <Modal
        title="Learner"
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ width: "100%" }}
        footer={null}
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          style={{ width: "100%" }}
        >
          <div style={{ display: "flex" }}>
            <div style={{ width: "100vw" }}>
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please input the name" }]}
              >
                <Input placeholder="Name" />
              </Form.Item>
              <Form.Item
                label="ID Number"
                name="idNumber"
                rules={[
                  { required: true, message: "Please input the ID number" },
                ]}
              >
                <Input placeholder="ID Number" />
              </Form.Item>

              <Form.Item
                label="Username"
                name="username"
                rules={[
                  { required: true, message: "Please input the username" },
                ]}
              >
                <Input placeholder="Username" />
              </Form.Item>
              
              <Form.Item label="Passport" name="passport">
                <Input placeholder="Passport" />
              </Form.Item>
              <Form.Item
                label="Second Name"
                name="secondName"
                rules={[
                  { required: true, message: "Please input the second name" },
                ]}
              >
                <Input placeholder="Second Name" />
              </Form.Item>
              <Form.Item
                label="Surname"
                name="surname"
                rules={[
                  { required: true, message: "Please input the surname" },
                ]}
              >
                <Input placeholder="Surname" />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input the password" },
                ]}
              >
                <Input placeholder="Password" />
              </Form.Item>
              <Form.Item
                label="Phone Number"
                name="phoneNumber"
                rules={[
                  { required: true, message: "Please input the phone number" },
                ]}
              >
                <Input placeholder="Phone Number" />
              </Form.Item>
            </div>
            <div style={{ width: "100vw" }}>
              <Form.Item
                label="Email Address"
                name="EmailAddress"
                rules={[
                  { required: true, message: "Please input the email address" },
                ]}
              >
                <Input placeholder="Email Address" />
              </Form.Item>
              <Form.Item
                label="Street Address"
                name="streetAddress"
                rules={[
                  {
                    required: true,
                    message: "Please input the street address",
                  },
                ]}
              >
                <Input placeholder="Street Address" />
              </Form.Item>
              <Form.Item
                label="Gender"
                name="gender"
                rules={[
                  { required: true, message: "Please select the gender" },
                ]}
              >
                <Select>
                  <Select.Option value={1}>Male</Select.Option>
                  <Select.Option value={2}>Female</Select.Option>
                  <Select.Option value={3}>Other</Select.Option>
                </Select>
              </Form.Item>
              {/* <Form.Item
                label="Relationship"
                name="relationship"
                rules={[
                  { required: true, message: "Please select the relationship" },
                ]}
              >
                <Select>
                  <Select.Option value="Mother">Mother</Select.Option>
                  <Select.Option value="Father">Father</Select.Option>
                  <Select.Option value="Other">Other</Select.Option>
                </Select>
              </Form.Item> */}
              <Form.Item
                label="Grade"
                name="grade"
                rules={[{ required: true, message: "Please select the grade" }]}
              >
                <Select>
                  <Select.Option value={8}>8</Select.Option>
                  <Select.Option value={9}>9</Select.Option>
                  <Select.Option value={10}>10</Select.Option>
                  <Select.Option value={11}>11</Select.Option>
                  <Select.Option value={12}>12</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Subject"
                name="subject"
                rules={[
                  // { required: true, message: "Please select the subjects" },
                ]}
              >
                <Space style={{ width: "100%" }} direction="vertical">
                  <Select
                    mode="multiple"
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Please select"
                    onChange={handleChange}
                    options={options}
                  />
                </Space>
              </Form.Item>
              <Form.Item
                label="Date of Birth"
                name="dateOfBirth"
                rules={[{ required: true }]}
              >
                <DatePicker />
              </Form.Item>
            </div>
          </div>

          <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Learner;
