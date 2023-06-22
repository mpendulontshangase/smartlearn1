import React, { useEffect } from "react";
import { Button, Checkbox, Form, Input, Switch } from "antd";
import Link from "next/link";
import Image from "next/image";
import logo from './BEDlogo.png'

import styles from "./style.module.css";
import { ILogin } from "../../Providers/User/context";
import { useUser } from "../../Providers/User";
import HomeLayout from "../../components/HomeLayout/HomeLayout";
import { useTeacher } from "../../Providers/Teacher";
import { getToken } from "../../utils/Decoder";




const Login: React.FC = () => {
  const { loginUser, getUserDetails, UserLogin } = useUser();




  let zz;

  if (typeof localStorage !== 'undefined') {
      zz = JSON.parse(localStorage.getItem('USERID'));
  }

  const onFinish = async (values: ILogin) => {
    console.log("Success:", values);

    if (!!loginUser) {
      console.log("wola");
      await loginUser(values);

      const teacherData = await getUserDetails(zz);
      console.log("teacherData",teacherData)
      const teacherID = teacherData;

      //  localStorage.setItem("teachersId", teacherID);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return(

  <>
  <HomeLayout>
  <div className={styles.loginContainer}>
    <div className={styles.loginForm}>
      <div className={styles.loginName}>
        <Image src={logo} alt="logo" />
        <h2 className={styles.smartlearn}>Smart Learn</h2>
      </div>
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
        {/* <Form.Item label="Use Passport" valuePropName="checked">
          <Switch />
        </Form.Item> */}

        <Form.Item
          label="Email"
          name="UserNameOrEmailAddress"
          rules={[
            { required: true, message: "Please input your correct email" }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <div  style={{marginLeft:"30px"}}>
      
      
          <Button style={{backgroundColor:"green"}} type="primary" htmlType="submit">
              Login
            </Button>
       
     
          <br />
          <div style={{marginLeft:"12px"}}>
          <Link href="/SignUp" style={{color:"green", fontSize:"10px"}}>Sign Up</Link>

          </div>

          </div>
          
        </Form.Item>
      </Form>
    </div>
  </div>
  </HomeLayout>
  </>)
};

export default Login;
