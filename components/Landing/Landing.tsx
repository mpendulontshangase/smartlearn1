import React from "react";
import Image from "next/image";
import styles from "./style.module.css";
import smart from "./smartLearn.png";
import { Button } from "antd";
import H from "../../pages/users/H";
import Link from "next/link";

function Landing() {
  return (
    <div className={styles.landing}>
      <div className={styles.backgroundImage}>
        <Image src={smart} alt="Background" />
      </div>
      <div className={styles.content}>
        
        <p className={styles.p}>
          Smart Learn 
        </p>
        <h1 id="aaa" className={styles.h1}>
          <span className={styles.span}>make communication and academic excellent easy</span>
        </h1>
     
      </div>
      <div className={styles.button}>
       
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
    </div>
  );
}

export default Landing;
