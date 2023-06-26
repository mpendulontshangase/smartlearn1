import React, { useEffect } from "react";
import { Button, Checkbox, Form, Input, Switch } from "antd";
import Link from "next/link";
import Image from "next/image";
import logo from "./BEDlogo.png";

import styles from "./style.module.css";
import { ILogin } from "../../Providers/User/context";
import { useUser } from "../../Providers/User";
import HomeLayout from "../../components/HomeLayout/HomeLayout";
import { useTeacher } from "../../Providers/Teacher";
import { getToken } from "../../utils/Decoder";

const Login: React.FC = () => {
  const { loginUser, getUserDetails, UserLogin } = useUser();
  const { ViewbyUserIdTeacher } = useTeacher();

  // let zz;

  // if (typeof localStorage !== 'undefined') {
  //  let zz = JSON.parse(localStorage.getItem('USERID'));



  // }

  const onFinish = async (values: ILogin) => {
    if (!!loginUser) {
      loginUser(values);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
  
  };

  return (
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
              <Form.Item wrapperCol={{ offset: 5, span: 16 }}
                name="UserNameOrEmailAddress"
                rules={[
                  {
                    required: true,
                    message: "Please input your correct email",
                  },
                ]}
              >
                <Input placeholder="email" />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 5, span: 16 }}
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password placeholder="password" />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
                <div>
                  <Button
                    style={{ backgroundColor: "#69b1ff", width: "270px" }}
                    type="primary"
                    htmlType="submit"
                  >
                    Login
                  </Button>

                  <br />
                  <div>
                   <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
                   <Link
                      href="/SignUp"
                      style={{ color: "#69b1ff", fontSize: "12px" }}
                    >
                      Sign Up
                    </Link>
                   </Form.Item>
                  </div>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
      </HomeLayout>
    </>
  );
};

export default Login;
