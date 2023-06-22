import React from "react";
import Image from "next/image";
import styles from "./style.module.css";
import smart from "./smartLearn.png";
import { Button } from "antd";

function Landing() {
  return (
    <div className={styles.landing}>
      <div className={styles.backgroundImage}>
        <Image src={smart} alt="Background" />
      </div>
      <div className={styles.content}>
        <h1 id="aaa" className={styles.h1}>
          {" "}
          <span className={styles.span}>SmartLearn</span>
        </h1>
        <p className={styles.p}>
          This website is designed to provide you with valuable information.
        </p>
        <p className={styles.p}>
          Smart Learn is an innovative online learning platform designed
          specifically for high school students. It offers a comprehensive range
          of educational resources and tools to enhance the learning experience
          and help students excel in their studies. With Smart Learn, high
          school students can access a variety of interactive lessons, video
          tutorials, practice exercises, and quizzes in various subjects such as
          mathematics, science, language arts, social sciences, and more. The
          platform is tailored to align with the curriculum requirements of
          different high school levels, ensuring that students receive relevant
          and targeted content. One of the key features of Smart Learn is its
          adaptive learning technology. The platform utilizes intelligent
          algorithms to personalize the learning journey for each student based
          on their individual strengths, weaknesses, and learning pace. This
          adaptive approach allows students to progress at their own speed and
          focus on areas that require more attention, leading to a more
          effective and efficient learning process. Smart Learn also provides
          features for tracking progress and performance. Students can monitor
          their scores, completion rates, and overall progress through
          interactive dashboards. 
        </p>
      </div>
      <div className={styles.button}>
        ,<Button className={styles.buttona}>How it works</Button>
      </div>
    </div>
  );
}

export default Landing;
