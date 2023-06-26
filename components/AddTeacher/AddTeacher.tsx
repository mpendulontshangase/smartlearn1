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
  Space,
} from "antd";
import { ITeacher } from "../../Providers/Teacher/context";
import { useTeacher } from "../../Providers/Teacher";
import styles from "./style.module.css";
import Link from "next/link";

const AddTeacher = () => {
  const [open, setOpen] = useState<boolean>(false);

  const [selectedSubjects, setSelectedSubjects] = useState([]);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setOpen(false);

  };

  const handleCancel = () => {

    setOpen(false);
  };

  const { CreateTeacher, Create } = useTeacher();

  useEffect(() => {
    if (Create !== null) {
     
    }
  }, []);

  const onFinish = (values) => {
    
    const subject = selectedSubjects;

    
    const mergedValues = { ...values, subject };
  
  
    
  
  


    CreateTeacher(mergedValues)
  
  };
  const { Option } = Select;
  const handleChange = (selectedSubjects) => {
    setSelectedSubjects(selectedSubjects);
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
      <Button type="primary" onClick={showModal}>Add Teacher</Button>
      
      <Modal
      width={800}
        title="Add New Teacher"
        visible={open}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" htmlType="submit" type="primary" form="myForm">
            Save
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
          <div>
            <div className={styles.maingrid}>
              <div className={styles.fgrid}>
                <div className={styles.formGroup}>
                  
                  <Form.Item
                     label="Name"
                    name="name"
                    rules={[
                      { required: true, message: "Please enter your name" },
                    ]}
                  >
                    <Input placeholder="Name" />
                  </Form.Item>
                </div>
                <div className={styles.formGroup}>
                 
                  <Form.Item
                     label="ID Number"
                    name="idNumber"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your ID number",
                      },
                    ]}
                  >
                    <Input placeholder="ID Number" />
                  </Form.Item>
                </div>
                <div className={styles.formGroup}>
                  
                  <Form.Item
                     label="passport" name="passport">
                    <Input placeholder="Passport" />
                  </Form.Item>
                </div>
                <div className={styles.formGroup}>
                 
                  <Form.Item
                     label="Second Name" name="secondName">
                    <Input placeholder="Second Name" />
                  </Form.Item>
                </div>
                <div className={styles.formGroup}>
                  
                  <Form.Item
                     label="Surname"
                    name="surname"
                    rules={[
                      { required: true, message: "Please enter your surname" },
                    ]}
                  >
                    <Input placeholder="Surname" />
                  </Form.Item>
                </div>
                <div className={styles.formGroup}>
                  
                  <Form.Item
                     label="Username"
                    name="username"
                    rules={[
                      { required: true, message: "Please enter your username" },
                    ]}
                  >
                    <Input placeholder="Username" />
                  </Form.Item>
                </div>
                
                <div className={styles.formGroup}>
                 
                  <Form.Item
                     label="Password"
                    name="password"
                    rules={[
                      { required: true, message: "Please enter your password" },
                    ]}
                  >
                    <Input type="password" placeholder="Password" />
                  </Form.Item>
                </div>
              </div>
              <div className={styles.sgrid}>
                <div className={styles.formGroup}>
                 
                  <Form.Item
                     label="Phone Number"
                    name="phoneNumber"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your phone Number",
                      },
                    ]}
                  >
                    <Input placeholder="Phone Number" />
                  </Form.Item>
                </div>
                <div className={styles.formGroup}>
                
                  <Form.Item
                     label="Email Address"
                    name="EmailAddress"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your email address",
                      },
                    ]}
                  >
                    <Input placeholder="Email Address" />
                  </Form.Item>
                </div>
                <div className={styles.formGroup}>
                  
                  <Form.Item
                     label="Street Address" name="streetAddress">
                    <Input placeholder="Street Address" />
                  </Form.Item>
                </div>
                <div className={styles.formGroup}>
                  
                  <Form.Item
                     label="Gender"
                    name="gender"
                    rules={[
                      { required: true, message: "Please select your gender" },
                    ]}
                  >
                    <Select placeholder="Gender">
                      <Option value={1}>Male</Option>
                      <Option value={2}>Female</Option>
                      <Option value={3}>Other</Option>
                    </Select>
                  </Form.Item>
                </div>

                <div className={styles.formGroup}>
                 
                  <Form.Item
                     label="Date of Birth"
                    name="dateOfBirth"
                    rules={[
                      {
                        required: true,
                        message: "Please select your date of birth",
                      },
                    ]}
                  >
                    <DatePicker />
                  </Form.Item>
                </div>
                <div className={styles.formGroup}>
                
                  <Form.Item
                label="Grade"
                name="grade"
                rules={[{ required: true, message: "Please select the grade" }]}
              >
                <Select placeholder="Grade">
                  <Select.Option value={1}>8</Select.Option>
                  <Select.Option value={2}>9</Select.Option>
                  <Select.Option value={3}>10</Select.Option>
                  <Select.Option value={4}>11</Select.Option>
                  <Select.Option value={5}>12</Select.Option>
                </Select>
              </Form.Item>
                </div>
                <div className={styles.formGroup}>
                
                  <Form.Item
                label="Subject"
                name="subject"
                // rules={[
                //   { required: true, message: "Please select the subjects" },
                // ]}
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
                </div>
            
              </div>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default AddTeacher;
