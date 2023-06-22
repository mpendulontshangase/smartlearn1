import React, { useEffect } from 'react';
import styles from './style.module.css';
import { useMessage } from '../../Providers/Messages';
import { Button } from 'antd';
import Link from 'next/link';

function ViewM() {
  const { View, ViewMessage } = useMessage();

  useEffect(() => {
    ViewMessage();
  }, []);

  return (
    <>
    <div className={styles.container}>
      {View?.map((message) => (
        <div key={message.id} className={`${styles.message} ${styles.sender}`}>
          <div className={styles.content}>{message.message_Description}</div>
          {message.reply && <div className={styles.reply}>{message.reply}</div>}
        </div>
      ))}
    </div>
    </>
  );
}

export default ViewM;
