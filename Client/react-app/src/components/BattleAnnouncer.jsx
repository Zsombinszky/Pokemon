import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";

const BattleAnnouncer = ({ message }) => {
  const [typedMessage, setTypedMessage] = useState("");

  useEffect(() => {
    setTypedMessage("");

    const typeMessage = async () => {
      for (let i = 0; i < message.length; i++) {
        await wait(50);
        setTypedMessage((prev) => prev + message[i]);
      }
    };

    typeMessage();
  }, [message]);

  const wait = (ms) =>
    new Promise((resolve) => {
      setTimeout(resolve, ms);
    });

  return (
    <div className={styles.main}>
      <div className={styles.message}>{typedMessage}</div>
    </div>
  );
};

export default BattleAnnouncer;
