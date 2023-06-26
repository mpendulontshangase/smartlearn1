import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import styles from "./style.module.css";
import Learner from "../AddLearner/Learner";
import { Button, Calendar, Form, Input, Select, Space } from "antd";
import Link from "next/link";
import SendMessage from "../SendMessage/sendmessage";
import { IMessage } from "../../Providers/Messages/context";
import { useMessage } from "../../Providers/Messages";
import { useForm } from "antd/es/form/Form";
import { StyleProvider } from "@ant-design/cssinjs";
import accounting from "./accounting.jpg";
import { useLearner } from "../../Providers/Learner";
import { useUser } from "../../Providers/User";
import { getToken } from "../../utils/Decoder";

const ParentDash = () => {
  const { getUserDetails, personInfo } = useUser();
  const { ViewL, ViewLearner } = useLearner();
  const userid = getToken()?.user.UserId;

  useEffect(() => {
    getUserDetails(userid);
  }, []);

  useEffect(() => {
    if (ViewL === null) {
      ViewLearner();
    }
  }, [ViewL, ViewLearner]);

  const [form] = useForm();
  const [sendmessage, setmessage] = useState(false);
  const [currentGrade, setcurrentGrade] = useState(null);
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  const { CreateMessage } = useMessage();

  const handleSendMessage = () => {
    setmessage(true);
  };

  const onFinish = (values: IMessage) => {

    const subject = selectedSubjects
   if (CreateMessage) {
    const messageWithSubjects = { ...values, subject };
    console.log(messageWithSubjects);
    CreateMessage(messageWithSubjects);
  }
   
    form.resetFields();
    setmessage(false);
  };

  const { Option } = Select;

  const getParentSubjects = () => {
    const parentLearner = ViewL.find(
      (learner) => learner.parent_Id === personInfo?.id
    );
    if (parentLearner) {
      setcurrentGrade(parentLearner.grade);
      return parentLearner.subjectDisplay;
    }
    return [];
  };

  const parentSubjects = useMemo(() => getParentSubjects(), [
    ViewL,
    personInfo?.id,
  ]);

  const isParentHasLearner = () => {
    const hasLearner = ViewL?.find(
      (learner) => learner.parent_Id === personInfo?.id
    );
  
    if (hasLearner) {
      const learnerSubjects = hasLearner.subjectDisplay;
      
      return learnerSubjects;
    }
  
    return false; 
  };
  
  
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
      <div style={{ display: "flex" }}>
        <div>
          <div className={styles.button}>
            {/* {!isParentHasLearner() && (
              <>
                <div>
                  <Learner />
                </div>
              </>
            )} */}
            <div>
              <Button style={{ backgroundColor: "#69b1ff", color: "black" ,width:"280px"}}>
                <Link style={{ textDecoration: "none" }} href="/ViewMessage">
                  View Message History
                </Link>
              </Button>
            </div>
          </div>

          <div style={{ width: "300px" }}>
            <div>
              <Button className={styles.smg} onClick={handleSendMessage}>
                Send a Message
              </Button>
            </div>
            {sendmessage && (
              <div
                style={{
                  borderRadius: "10px",
                  width: "300px",
                  marginTop: "10px",
                }}
              >
                <StyleProvider hashPriority="high">
                  <Form
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 10 }}
                    layout="horizontal"
                    onFinish={onFinish}
                    id="myForm"
                    form={form}
                  >
                    <div style={{ display: "flex" }}>
                      <div className={styles.formGroup}>
                        <Form.Item name="grade">
                          <Select placeholder="grade">
                            <Option value={1}>8</Option>
                            <Option value={2}>9</Option>
                            <Option value={3}>10</Option>
                            <Option value={4}>11</Option>
                            <Option value={5}>12</Option>
                          </Select>
                        </Form.Item>
                      </div>
                    </div>
                    <div className={styles.formGroup}>
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
                    </div>
                    <div className={styles.formGroup}>
                      <Form.Item
                        name="message_Description"
                        rules={[
                          {
                            required: true,
                            message: "Please type something",
                          },
                        ]}
                      >
                        <Input.TextArea
                          className={styles.textArea}
                          placeholder="type message here"
                        />
                      </Form.Item>
                    </div>
                    <div>
                      <Button
                        key="submit"
                        htmlType="submit"
                        style={{ backgroundColor: "#69b1ff", color: "white" }}
                        form="myForm"
                      >
                        Send
                      </Button>
                    </div>
                  </Form>
                </StyleProvider>
              </div>
            )}
            <div
              style={{
                backgroundColor: "green",
                border: "1px solid #69b1ff",
                borderRadius: "10px",
                width: "300px",
              }}
            >
              <Calendar style={{ width: "300px" }} fullscreen={false} />
            </div>
          </div>
        </div>

        <div className={styles.cover}>
          <div className={styles.container}>
            {isParentHasLearner() ? (
              parentSubjects?.map((subject, subjectIndex) => (
                <Link href="/HomeworkSubject" key={subjectIndex}>
                  <div className={styles.List}>
                    <span className={styles.MovieTitle}>{subject}</span>
                  </div>
                </Link>
              ))
            ) : (
              <div className={styles.you}>You currently don't have a learner.
              <div style={{textAlign:"center"}}>
                  <Learner />
                </div></div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ParentDash;
