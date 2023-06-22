import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  InputNumber,
} from "antd";
// import { useTeacher } from '../Providers/Teacherss';
import { EditOutlined } from "@ant-design/icons";

import { useTeacher } from "../Providers/Teacher";
import { ITeacher } from "../Providers/Teacher/context";

const { Option } = Select;

const ViewModel: React.FC<ITeacher> = ({
  id,
  name,
  secondName,
  surname,
  idNumber,
  username,
  emailAddress,
  password,
  phoneNumber,
  streetAddress,
  age,
  gender,
  dateOfBirth,
  passport,
  relationship,
  subject,grade
}) => {
  const [visible, setVisible] = useState(false);
  const [edit, setEdit] = useState(false);
  const [form] = Form.useForm();

  const { UpdateTeacher } = useTeacher();

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleEdit = () => {
    setEdit(true);
  };

  const onFinish = (values: ITeacher) => {

   
      
    UpdateTeacher(values);
    setEdit(false);
    setVisible(false);



   
  };

  return (
    <>
      <Button type="primary" className="ViewButton" onClick={showModal}>
        View
      </Button>
      <Modal
        title={`Details of ${name}`}
        open={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="nest-messages"
          layout="vertical"
          onFinish={onFinish}
          form={form}
          initialValues={{
          
            name,
            secondName,
            surname,
            idNumber: idNumber,
            username,
            emailAddress,
            password,
            phoneNumber,
            streetAddress,
            age,
            gender,
            dateOfBirth,
            passport,
            relationship,
            grade,subject
                    }}
          
        >
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div>
              <Form.Item name="id" initialValue={id} hidden>
                <Input type="hidden" />
              </Form.Item>

              <Form.Item label="Name" name="name">
                {edit ? <Input /> : <span>{name}</span>}
              </Form.Item>

              <Form.Item label="Surname" name="surname">
                {edit ? <Input /> : <span>{surname}</span>}
              </Form.Item>

              <Form.Item label="Second Name" name="secondName">
                {edit ? <Input /> : <span>{secondName}</span>}
              </Form.Item>

              <Form.Item label="ID Number" name="idNumber">
                {edit ? <Input /> : <span>{idNumber}</span>}
              </Form.Item>

              <Form.Item label="Passport" name="passport">
                {edit ? <Input /> : <span>{passport}</span>}
              </Form.Item>

              <Form.Item label="PhoneNumber" name="phoneNumber">
                {edit ? <Input /> : <span>{phoneNumber}</span>}
              </Form.Item>
            </div>
            <div>
              <Form.Item label="EmailAddress" name="emailAddress">
                {edit ? <Input /> : <span>{emailAddress}</span>}
              </Form.Item>
              <Form.Item label="Street Address" name="streetAddress">
                {edit ? <Input /> : <span>{streetAddress}</span>}
              </Form.Item>
              <Form.Item label="Gender" name="gender">
                {edit ? (
                  <Select>
                    <Option value="Male">Male</Option>
                    <Option value="Female">Female</Option>
                    <Option value="Other">Other</Option>
                  </Select>
                ) : (
                  <span>{gender}</span>
                )}
              </Form.Item>
              <Form.Item label="Grade" name="grade">
                {edit ? (
                  <Select>
                    <Option value="8">8</Option>
                    <Option value="9">9</Option>
                    <Option value="10">10</Option>
                    <Option value="11">11</Option>
                    <Option value="12">12</Option>
                  </Select>
                ) : (
                  <span>{grade}</span>
                )}
              </Form.Item>

              <Form.Item label="Subject" name="subject">
                {edit ? (
                  <Select>
                    <Option value="8">isiZulu</Option>
                    <Option value="9">English</Option>
                    <Option value="10">Mathematics</Option>
                    <Option value="11">LO</Option>
                    <Option value="12">Social Sciences</Option>
                    <Option value="12">Life Sciences</Option>
                  </Select>
                ) : (
                  <span>{subject}</span>
                )}
              </Form.Item>

              <Form.Item label="Date of Birth" name="DOB">
                {edit ? <DatePicker /> : <span>{dateOfBirth}</span>}
              </Form.Item>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {!edit && (
              <Button type="primary" onClick={handleEdit}>
                Edit
              </Button>
            )}

            {edit && (
              <div id="cancelUpdateButton">
                <div>
                  <Button
                    style={{ marginRight: 10 }}
                    onClick={() => setEdit(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="primary" htmlType="submit">
                    Update
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default ViewModel;
