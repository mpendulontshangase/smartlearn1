import React, { useEffect, useState } from 'react';
import { Avatar, Button, Col, Divider, Drawer, List, Row } from 'antd';
import styles from './sidebar.module.css';
import Link from 'next/link';
import axios from "axios";
import { useUser } from '../Providers/User';
import { getToken } from '../utils/Decoder';


interface DescriptionItemProps {
  title: string;
  content: React.ReactNode;
}

const DescriptionItem = ({ title, content }: DescriptionItemProps) => (
  <div className={styles.siteDescriptionItemProfileWrapper}>
    <p className={styles.siteDescriptionItemProfilePLabel}>{title}:</p>
    <span>{content}</span>
  </div>
);

const CurrentUser="https://localhost:44311/api/services/app/Session/GetCurrentLoginInformations"

const SideBar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');


  const {logoutUser}=useUser()


  const handleLogout=()=>{
    logoutUser()
  }

  useEffect(() => {
    const decodedToken = getToken();

    if (decodedToken) {
      const { username, email } = decodedToken.user;
      setId(id || '');
      setName(username || '');
      setEmail(email || '');
    }
  }, []);

  

const getUserInfo = async () => {
  try {
    const response = await axios.get(CurrentUser);
    if (response.data && response.data.success) {
      const userInfo = response.data;
     
    } else {
      throw new Error("Failed to fetch user info");
    }
  } catch (error) {
    console.error("An error occurred: Trying to fetch user info", error);
  }
};





  useEffect(() => {
    getUserInfo();
 
  }, []);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <List
        style={{ border: '0px', padding: '0px', margin: '0px' }}
        dataSource={[
          {
            id: id,
            name: name,
            email: email
          }
        ]}
        bordered
        renderItem={(item) => (
          <List.Item
            style={{ border: '0px', padding: '0px', margin: '0px' }}
            key={item.id}
            className={styles.customListItem}
          >
            <a style={{ color: 'white' }} onClick={showDrawer} key={`a-${item.id}`}>
              <Avatar src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
            </a>
          </List.Item>
        )}
      />
      <Drawer className={styles.drawer} width={300} placement="right" closable={false} onClose={onClose} open={open}>
        <Row style={{ justifyContent: 'space-between' }}>
          <p className={styles.siteDescriptionItemProfileP} style={{ marginBottom: 24 }}>
            Your Profile
          </p>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Name" content={name} />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Email" content={email} />
          </Col>
        </Row>
        <Divider />
        <Link href="/">
          <Button onClick={handleLogout} danger>Logout</Button>
        </Link>
        
          {/* <Button danger>De-Activate</Button> */}
       
      </Drawer>
    </>
  );
};

export default SideBar;
