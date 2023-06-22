import React, { useState } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  InputNumber,
  Upload,
} from "antd";
// import { useParent } from '../Providers/Parentss';
import { EditOutlined } from "@ant-design/icons";

import { useParent } from "../Providers/Parent";
import { IParent } from "../Providers/Parent/context";
import { IHomework } from "../Providers/Homework/context";
import { useHomework } from "../Providers/Homework";

const { Option } = Select;

const ViewTR: React.FC<IHomework> = ({
  id,
  homeworkDescription,
  due_Date,

  grade,
  subject,
  file,

}) => {
  const [visible, setVisible] = useState(false);
  const [edit, setEdit] = useState(false);
  const [form] = Form.useForm();

  const { UpdateHomework } = useHomework();

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleEdit = () => {
    setEdit(true);
  };

  const onFinish = (values: IHomework) => {
    UpdateHomework(values);
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
            homeworkDescription,
            grade,
            file,
            subject,
          
          }}
        >
          <div style={{ display: "flex", justifyContent:"space-around" }}>
                <div>
                <Form.Item name="id" initialValue={id} hidden>
                    <Input type="hidden" />
                </Form.Item>

                <Form.Item label="Description" name="homeworkDescription">
                    {edit ? <Input /> : <span>{homeworkDescription}</span>}
                </Form.Item>

               

               

                <Form.Item label="File" name="file">
                    {edit ?  <Form.Item label="Upload" name="upload">
              <Upload>
                <Button>Click to Upload</Button>
              </Upload>
            </Form.Item> : <span>{file}</span>}
                </Form.Item>
                <div>
                
                <Form.Item label="Grade" name="gender">
                    {edit ? (
                   <Select>
                   <Select.Option value="8">1</Select.Option>
                   <Select.Option value="9">2</Select.Option>
                   <Select.Option value="10">3</Select.Option>
                   <Select.Option value="11">4</Select.Option>
                   <Select.Option value="12">5</Select.Option>
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
                    <Option value="13">Life Sciences</Option>
                  </Select>
                ) : (
                  <span>{subject}</span>
                )}
              </Form.Item>

               
                </div>

               
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

export default ViewTR;
