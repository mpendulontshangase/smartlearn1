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
import { ITeacher } from "../../Providers/Teacher/context";
import { useTeacher } from "../../Providers/Teacher";
import styles from "./style.module.css";
import Link from "next/link";

const AddTeacher = () => {
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

  const { CreateTeacher, Create } = useTeacher();

  useEffect(() => {
    if (Create !== null) {
      console.log(Create);
    }
  }, []);

  const onFinish = (values: ITeacher) => {
    console.log("Form values:", values);
    if (CreateTeacher) {
      CreateTeacher(values);
    }
    handleOk();
  };
  const { Option } = Select;

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
                  <label>
                    Name<span className={styles.required}>*</span>
                  </label>
                  <Form.Item
                    name="name"
                    rules={[
                      { required: true, message: "Please enter your name" },
                    ]}
                  >
                    <Input placeholder="Name" />
                  </Form.Item>
                </div>
                <div className={styles.formGroup}>
                  <label>
                    ID Number<span className={styles.required}>*</span>
                  </label>
                  <Form.Item
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
                  <label>Passport</label>
                  <Form.Item name="passport">
                    <Input placeholder="Passport" />
                  </Form.Item>
                </div>
                <div className={styles.formGroup}>
                  <label>Second Name</label>
                  <Form.Item name="secondName">
                    <Input placeholder="Second Name" />
                  </Form.Item>
                </div>
                <div className={styles.formGroup}>
                  <label>
                    Surname
                    <span className={styles.required}>*</span>
                  </label>
                  <Form.Item
                    name="surname"
                    rules={[
                      { required: true, message: "Please enter your surname" },
                    ]}
                  >
                    <Input placeholder="Surname" />
                  </Form.Item>
                </div>
                <div className={styles.formGroup}>
                  <label>
                    Username
                    <span className={styles.required}>*</span>
                  </label>
                  <Form.Item
                    name="username"
                    rules={[
                      { required: true, message: "Please enter your username" },
                    ]}
                  >
                    <Input placeholder="Username" />
                  </Form.Item>
                </div>
                
                <div className={styles.formGroup}>
                  <label>
                    Password<span className={styles.required}>*</span>
                  </label>
                  <Form.Item
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
                  <label>
                    Phone Number
                    <span className={styles.required}>*</span>
                  </label>
                  <Form.Item
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
                  <label>
                    Email Address<span className={styles.required}>*</span>
                  </label>
                  <Form.Item
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
                  <label>Street Address</label>
                  <Form.Item name="streetAddress">
                    <Input placeholder="Street Address" />
                  </Form.Item>
                </div>
                <div className={styles.formGroup}>
                  <label>
                    Gender<span className={styles.required}>*</span>
                  </label>
                  <Form.Item
                    name="gender"
                    rules={[
                      { required: true, message: "Please select your gender" },
                    ]}
                  >
                    <Select>
                      <Option value="Male">Male</Option>
                      <Option value="Female">Female</Option>
                      <Option value="Other">Other</Option>
                    </Select>
                  </Form.Item>
                </div>

                <div className={styles.formGroup}>
                  <label>
                    Date of Birth<span className={styles.required}>*</span>
                  </label>
                  <Form.Item
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
                  <label>
                    Grade<span className={styles.required}>*</span>
                  </label>
                  <Form.Item
                    name="subject"
                    rules={[
                      { required: true, message: "Please select your subject" },
                    ]}
                  >
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
                  <label>
                    Subject<span className={styles.required}>*</span>
                  </label>
                  <Form.Item
                    name="subject"
                    rules={[
                      { required: true, message: "Please select your subject" },
                    ]}
                  >
                     <Select>
                    <Option value="8">isiZulu</Option>
                    <Option value="9">English</Option>
                    <Option value="10">Mathematics</Option>
                    <Option value="11">LO</Option>
                    <Option value="12">Social Sciences</Option>
                    <Option value="12">Life Sciences</Option>
                  </Select>
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
