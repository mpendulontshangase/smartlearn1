import { Button, Form, Input, Select, DatePicker } from "antd";
import Link from "next/link";
import React from "react";
import styles from "./style.module.css";
import { useUser } from "../../Providers/User";
import HomeLayout from "../../components/HomeLayout/HomeLayout";

const { Option } = Select;

const SignUp: React.FC = () => {
 

  const { createUser } = useUser();
  const onFinish = (values: any) => {
  
    if (createUser) {
      createUser(values);
    }

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
              <Form.Item wrapperCol={{ offset: 5, span: 16 }}
                name="name"
              
                rules={[{ required: true, message: "Please enter your name" }]}
              >
                <Input placeholder="Name" />
              </Form.Item>
            </div>
            <div className={styles.signupInput}>
              <Form.Item wrapperCol={{ offset: 5, span: 16 }}
                name="idNumber"
             
                rules={[{ required: true, message: "Please enter your ID number" }]}
              >
                <Input placeholder="ID Number" />
              </Form.Item>
            </div>
            <div className={styles.signupInput}>
              <Form.Item wrapperCol={{ offset: 5, span: 16 }} name="passport" >
                <Input placeholder="Passport" />
              </Form.Item>
            </div>
            <div className={styles.signupInput}>
              <Form.Item wrapperCol={{ offset: 5, span: 16 }} name="secondName" >
                <Input placeholder="Second Name" />
              </Form.Item>
            </div>
            <div className={styles.signupInput}>
              <Form.Item wrapperCol={{ offset: 5, span: 16 }}
                name="surname"
               
                rules={[{ required: true, message: "Please enter your surname" }]}
              >
                <Input placeholder="Surname" />
              </Form.Item>
            </div>
            <div className={styles.signupInput}>
              <Form.Item wrapperCol={{ offset: 5, span: 16 }}
                name="password"
               
                rules={[{ required: true, message: "Please enter your password" }]}
              >
                <Input type="password" placeholder="Password" />
              </Form.Item>
            </div>
            </div>

            <div style={{width:"100%"}}>
            <div className={styles.signupInput}>
              <Form.Item wrapperCol={{ offset: 5, span: 16 }}
                name="phoneNumber"
               
                rules={[
                  { required: true, message: "Please enter your phone number" },
                ]}
              >
                <Input placeholder="Phone Number" />
              </Form.Item>
            </div>
            <div className={styles.signupInput}>
              <Form.Item wrapperCol={{ offset: 5, span: 16 }}
                name="emailAddress"
             
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
              <Form.Item wrapperCol={{ offset: 5, span: 16 }} name="streetAddress" >
                <Input placeholder="Street Address" />
              </Form.Item>
            </div>
            <div className={styles.signupInput}>
              <Form.Item wrapperCol={{ offset: 5, span: 16 }}
                name="gender"
                
                rules={[{ required: true, message: "Please select your gender" }]}
              >
                <Select>
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
                  <Option value="Other">Other</Option>
                </Select>
              </Form.Item>
            </div>
            {/* <div className={styles.signupInput}>
              <Form.Item wrapperCol={{ offset: 5, span: 16 }}
                name="relationship"
              
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
            </div> */}
           
            <div className={styles.signupInput}>
              <Form.Item wrapperCol={{ offset: 5, span: 16 }} name="username" >
                <Input placeholder="Username" />
              </Form.Item>
            </div>

            <div className={styles.signupInput}>
              <Form.Item wrapperCol={{ offset: 5, span:16 }}
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
