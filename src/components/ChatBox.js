import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import socket from "../context/socket";

const ChatBox = ({ author, campId, camp }) => {
  const [cost, setCost] = useState(0);
  const [chat, setChat] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const { user } = useContext(GlobalContext);

  useEffect(() => {
    if (user) fetchData();
  }, [camp, user]);

  const { sendChat, getChats } = useContext(GlobalContext);

  async function handlerSend(e) {
    try {
      e.preventDefault();
      const data = {
        costOffered: cost,
        text: chat,
        user,
        isAuthor: false,
      };
      await sendChat(campId, data);
      setChat("");
    } catch (err) {
      console.log(err);
    }
  }

  async function fetchData() {
    try {
      const obj = { user };
      const resp = await getChats(campId, obj);
      if (resp && resp.message) setChatMessages(resp.message);
      if (resp && resp.costOffered) setCost(resp.costOffered);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={styles.chatContainer}>
      <div style={styles.card}>
        <div style={styles.cardHeader}>Chat Box</div>
        <div style={styles.cardBody}>
          <div style={styles.formGroup}>
            <label htmlFor="cost">Cost to Offer</label>
            <input
              type="number"
              style={styles.input}
              id="cost"
              placeholder="Enter cost to offer"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
            />
          </div>
          <form onSubmit={handlerSend}>
            <div style={styles.formGroup}>
              <label htmlFor="chat">Chats</label>
              <div
                style={
                  chatMessages.length > 6
                    ? {
                        ...styles.chatMessages,
                        overflowY: "scroll",
                        height: "200px",
                      }
                    : styles.chatMessages
                }
              >
                <ul style={styles.messageList}>
                  {chatMessages.map((msg, index) => (
                    <li
                      key={index}
                      style={{
                        ...styles.messageItem,
                        color: msg.isAuthor ? "#007bff" : "#28a745",
                        textAlign: msg.isAuthor ? "left" : "right",
                      }}
                    >
                      {msg.text}
                    </li>
                  ))}
                </ul>
              </div>
              <textarea
                style={styles.textarea}
                id="chat"
                rows="3"
                placeholder="Enter your message here"
                value={chat}
                onChange={(e) => setChat(e.target.value)}
              ></textarea>
            </div>
            <button type="submit" style={styles.button}>
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  chatContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#eef2f7",
    padding: "20px",
  },
  card: {
    width: "100%",
    maxWidth: "600px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
  },
  cardHeader: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "15px",
    fontSize: "20px",
    fontWeight: "bold",
    textAlign: "center",
  },
  cardBody: {
    padding: "20px",
  },
  formGroup: {
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  chatMessages: {
    marginBottom: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "15px",
    backgroundColor: "#f9f9f9",
  },
  messageList: {
    listStyleType: "none",
    padding: 0,
    margin: 0,
  },
  messageItem: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
    backgroundColor: "#f1f1f1",
    borderRadius: "4px",
    marginBottom: "5px",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginBottom: "10px",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default ChatBox;
