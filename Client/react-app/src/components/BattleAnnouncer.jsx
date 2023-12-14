import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";

const BattleAnnouncer = ({ message, context }) => {
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

    const determineStyle = () => {
      if (context === "location") {
        return styles.main;
      } else if (context === "encounter") {
        return styles._main_1000y_1;
      } else {
        return "";
      }
    };

  return (
    <div className={determineStyle()}>
      <div className={styles.message}>{typedMessage}</div>
    </div>
  );
};

export default BattleAnnouncer;
