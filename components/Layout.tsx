import React, { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import SideBar from './SideBar';
import styles from './layout.module.css';
import logo from '../Images/BEDlogo.png';
import { getToken } from '../utils/Decoder';

type Props = {
  children?: ReactNode;
  title?: string;
};



const Layout = ({ children, title = 'Smart Learn' }: Props) => {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const decodedToken = getToken();
   
    if (decodedToken) {
      const { username, email } = decodedToken.user;
      setId(decodedToken?.user?.UserId || '');
      setName(username || '');
      setEmail(email || '');
    }
  }, []);

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <nav className={styles['nav-container']}>
          <div className={styles['logo-container']}>
            <Link href="/Dashboard">
              <Image style={{height:"50px", width:"200px"}} src={logo} alt="logo"/>
            </Link>
          </div>
          <div className={styles['search-container']}>
            {/* <input className={styles['search-input']} type="text" placeholder="Search" /> */}
            {/* <Search/> */}
          </div>
          <div className={styles['user-container']}>
            <h4 className={styles['user-email']}>{email}</h4>
            <SideBar />
          </div>
        </nav>
      </header>
      {children}
    
    </div>
  );
};

export default Layout;
