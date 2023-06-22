import { Button, Form, Input, Select, DatePicker } from "antd";
import Link from "next/link";
import React from "react";
import styles from "./style.module.css";
import { useUser } from "../../Providers/User";
import HomeLayout from "../../components/HomeLayout/HomeLayout";

const { Option } = Select;

const SignUp: React.FC = () => {
  console.log("Received values of form: ");

  const { createUser } = useUser();
  const onFinish = (values: any) => {
    console.log(values);
    if (createUser) {
      createUser(values);
    }
    console.log("Received values of form: ", values);
  };

  return (
    <HomeLayout>
      <div className={styles.signupContainer}>
        <div className={styles.signupForm}>
         
          <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
            // style={{display:"flex" ,gap:"50px", backgroundColor:"white", padding:"20px", borderRadius:"10px",width:"60vw"}}
          >
             <div className={styles.signupName}>
            <h2 className={styles.smartlearn}>Parent Sign Up</h2>
          </div>
            <div style={{display:"flex" ,gap:"50px", backgroundColor:"white", padding:"20px", borderRadius:"10px",width:"60vw"}}>
            <div style={{width:"100%"}}>
            <div className={styles.signupInput}>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: "Please enter your name" }]}
              >
                <Input placeholder="Name" />
              </Form.Item>
            </div>
            <div className={styles.signupInput}>
              <Form.Item
                name="idNumber"
                label="ID Number"
                rules={[{ required: true, message: "Please enter your ID number" }]}
              >
                <Input placeholder="ID Number" />
              </Form.Item>
            </div>
            <div className={styles.signupInput}>
              <Form.Item name="passport" label="Passport">
                <Input placeholder="Passport" />
              </Form.Item>
            </div>
            <div className={styles.signupInput}>
              <Form.Item name="secondName" label="Second Name">
                <Input placeholder="Second Name" />
              </Form.Item>
            </div>
            <div className={styles.signupInput}>
              <Form.Item
                name="surname"
                label="Surname"
                rules={[{ required: true, message: "Please enter your surname" }]}
              >
                <Input placeholder="Surname" />
              </Form.Item>
            </div>
            <div className={styles.signupInput}>
              <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true, message: "Please enter your password" }]}
              >
                <Input type="password" placeholder="Password" />
              </Form.Item>
            </div>
            </div>

            <div style={{width:"100%"}}>
            <div className={styles.signupInput}>
              <Form.Item
                name="phoneNumber"
                label="Phone Number"
                rules={[
                  { required: true, message: "Please enter your phone number" },
                ]}
              >
                <Input placeholder="Phone Number" />
              </Form.Item>
            </div>
            <div className={styles.signupInput}>
              <Form.Item
                name="emailAddress"
                label="Email Address"
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
            <div className={styles.signupInput}>
              <Form.Item name="streetAddress" label="Street Address">
                <Input placeholder="Street Address" />
              </Form.Item>
            </div>
            <div className={styles.signupInput}>
              <Form.Item
                name="gender"
                label="Gender"
                rules={[{ required: true, message: "Please select your gender" }]}
              >
                <Select>
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
                  <Option value="Other">Other</Option>
                </Select>
              </Form.Item>
            </div>
            <div className={styles.signupInput}>
              <Form.Item
                name="relationship"
                label="Relationship"
                rules={[
                  {
                    required: true,
                    message: "Please select your relationship",
                  },
                ]}
              >
                <Select>
                  <Option value="Mother">Mother</Option>
                  <Option value="Father">Father</Option>
                  <Option value="Other">Other</Option>
                </Select>
              </Form.Item>
            </div>
            <div className={styles.signupInput}>
              <Form.Item
                name="dateOfBirth"
                label="Date of Birth"
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
            <div className={styles.signupInput}>
              <Form.Item name="username" label="Username">
                <Input placeholder="Username" />
              </Form.Item>
            </div>
            

            </div>
            
            
            </div>
            <div className={styles.signupButtonContainer}>
              <Button
                type="primary"
                htmlType="submit"
                className={styles.signupButton}
              >
                Sign Up
              </Button>
              <Link href="/Login" className={styles.signupLink}>
                Login
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </HomeLayout>
  );
};

export default SignUp;
