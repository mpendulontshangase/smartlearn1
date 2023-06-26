import React, { useEffect, useState } from "react";
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

import { useLearner } from "../../Providers/Learner";
import { useUser } from "../../Providers/User";
import { useForm } from "antd/es/form/Form";

const Learner: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [id, setId] = useState(null);

  const {CreateLearner}=useLearner();
  const {getUserDetails, personInfo}=useUser();
  const [form]=useForm();
  


 
  
  useEffect(()=>{
   
    if(personInfo){
      setId(personInfo.id)
    }
  },[personInfo])

  

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

 
  const onFinish = (values) => {
    const parent_Id = id;
    const subject = selectedSubjects; // Use the selectedSubjects array directly
  
    const mergedValues = { ...values, subject, parent_Id };
  
  
    
  
  


    CreateLearner(mergedValues)
    form.resetFields();
  
  };

  const onFinishFailed = (errorInfo) => {
    // console.log("Failed:", errorInfo);
  };

  const options = [
    { label: "IsiZulu", value: 1 },
    { label: "English", value: 2 },
    { label: "Mathematics", value: 4 },
    { label: "Life Orientation", value: 8 },
    { label: "Technology", value: 16 },
    { label: "NS", value: 32 },
    { label: "EMS", value: 64 },
  
  ];

  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        style={{ backgroundColor: "#69b1ff" ,color:"black"}}
      >
        Add Learner
      </Button>
      <Modal
        title="Learner"
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={700}
        style={{ width: "100vw" }}
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
                
                name="name"
                rules={[{ required: true, message: "Please input the name" }]}
              >
                <Input placeholder="Name" />
              </Form.Item>
              <Form.Item
             
                name="idNumber"
                rules={[
                  { required: true, message: "Please input the ID number" },
                ]}
              >
                <Input placeholder="ID Number" />
              </Form.Item>

              <Form.Item
              
                name="username"
                rules={[
                  { required: true, message: "Please input the username" },
                ]}
              >
                <Input placeholder="Username" />
              </Form.Item>
              
              <Form.Item name="passport">
                <Input placeholder="Passport" />
              </Form.Item>
              <Form.Item
              
                name="secondName"
               
              >
                <Input placeholder="Second Name" />
              </Form.Item>
              <Form.Item
               
                name="surname"
                rules={[
                  { required: true, message: "Please input the surname" },
                ]}
              >
                <Input placeholder="Surname" />
              </Form.Item>
              <Form.Item
              
                name="password"
                rules={[
                  { required: true, message: "Please input the password" },
                ]}
              >
                <Input placeholder="Password" />
              </Form.Item>
             
            </div>
            <div style={{ width: "100vw" }}>
            <Form.Item
            
            name="phoneNumber"
            rules={[
              { required: true, message: "Please input the phone number" },
            ]}
          >
            <Input placeholder="Phone Number" />
          </Form.Item>
              <Form.Item
              
                name="EmailAddress"
                rules={[
                  { required: true, message: "Please input the email address" },
                ]}
              >
                <Input placeholder="Email Address" />
              </Form.Item>
              <Form.Item
            
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
             
                name="gender"
                rules={[
                  { required: true, message: "Please select the gender" },
                ]}
              >
                <Select placeholder="Gender">
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
               
                name="grade"
                rules={[{ required: true, message: "Please select the grade" }]}
              >
                <Select  placeholder="Grade">
                  <Select.Option value={1}>8</Select.Option>
                  <Select.Option value={2}>9</Select.Option>
                  <Select.Option value={3}>10</Select.Option>
                  <Select.Option value={4}>11</Select.Option>
                  <Select.Option value={5}>12</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
              
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
                    placeholder="Subjects"
                    onChange={handleChange}
                    options={options}
                  />
                </Space>
              </Form.Item>
              <Form.Item
              
                name="dateOfBirth"
                rules={[{ required: true }]}
              >
                <DatePicker />
              </Form.Item>
            </div>
          </div>

          <Form.Item wrapperCol={{ offset: 10, span: 14 }}>
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
