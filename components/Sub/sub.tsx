import React, { useEffect, useState } from 'react';
import { useHomework } from '../../Providers/Homework';
import styles from './style.module.css';
import { CheckCircleOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { Button } from 'antd';

function Sub() {
  const { View, ViewHomework } = useHomework();
  const [clickedId, setClickedId] = useState(null);

  useEffect(() => {
    ViewHomework();
  }, []);

  const filteredHomeworks = View.filter(
    (homework) => Number(homework.subject) === 4 && Number(homework.grade) === 2
  );

  const handleClick = (id) => {
    if (clickedId === id) {
      setClickedId(null);
    } else {
      setClickedId(id);
    }
  };

  return (
    <div className={styles.container}>
    <Button><Link href="/ParentDashboard">Back</Link></Button>

      {filteredHomeworks.map((homework) => (
        <div
          key={homework.id}
          className={`${styles.homework} ${
            clickedId === homework.id ? styles.clicked : ''
          }`}
        >
          <p className={styles.subject}>Subject: {homework.subject}</p>
          <p className={styles.grade}>Grade: {homework.grade}</p>
          <div className={styles.details}>
            <p className={styles.title}>New Homework</p>
            <br />
            <p onClick={() => handleClick(homework.id)}>
              {homework.homeworkDescription}{' '}
              <CheckCircleOutlined
                className={clickedId === homework.id ? styles.blue : ''}
              />
            </p>
            <p>{homework.file}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Sub;
