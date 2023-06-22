import React, { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

import styles from "./style.module.css";
import logo from "./BEDlogo.png";

type Props = {
  children?: ReactNode;
  title?: string;
};

const HomeLayout = ({ children, title = "Smart Learn" }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <div className={styles.navbarLogo}>
          <Image height={50} src={logo} alt="Logo" />
        </div>
        <ul className={styles.navbarMenu}>
          <li className={styles.navbarMenuItem}>
            <Link href="/">Home</Link>
          </li>
          <li className={styles.navbarMenuItem}>
            <Link href="/AdminDashboard">Admin</Link>
          </li>
          <li className={styles.navbarMenuItem}>
            <Link href="/contact">Learner</Link>
          </li>
          <li className={styles.navbarMenuItem}>
            <Link href="/TeacherDashboard">Teacher</Link>
          </li>
          <li className={styles.navbarMenuItem}>
            <Link href="/ParentDashboard">Parent</Link>
          </li>
         
        </ul>

        <div style={{display:"flex", gap:"10px"}} className={styles.navbarActions}>
          <div className={styles.navbarRActions}>
            <Link href="/SignUp">
            <button type="button" className={styles.navbarRButton}>
              <span>Register</span>
            </button>
            </Link>
          </div>
          <div className={styles.navbarLActions}>
            <Link href="/Login">
            <button type="button" className={styles.navbarLButton}>
              <span>Login</span>
            </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
    {children}
    <footer className={styles.footer}>
      <hr />
      <span>@intozami zimayakayaka</span>
    </footer>
  </div>
);

export default HomeLayout;
