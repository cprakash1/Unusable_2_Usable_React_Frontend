import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import socket from "../context/socket";

const ChatBoxAdmin = ({ author, campId, camp }) => {
  const [cost, setCost] = useState(0);
  const [chat, setChat] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [allUsersChat, setAllUsersChat] = useState([]);
  const [selectUser, setSelectUser] = useState("");

  const { user, getAllChatsForSeller } = useContext(GlobalContext);
  const { sendChat, getChats } = useContext(GlobalContext);

  useEffect(() => {
    if (user) fetchAllChatData();
  }, [camp, user]);

  async function handlerSend(e) {
    try {
      e.preventDefault();
      const data = {
        costOffered: cost,
        text: chat,
        user: selectUser,
        isAuthor: true,
      };
      await sendChat(campId, data);
      setChat("");
    } catch (err) {
      console.log(err);
    }
  }

  async function fetchData() {
    try {
      const obj = { user: selectUser };
      const resp = await getChats(campId, obj);
      if (resp && resp.message) setChatMessages(resp.message);
      if (resp && resp.costOffered) setCost(resp.costOffered);
    } catch (err) {
      console.log(err);
    }
  }

  async function fetchAllChatData() {
    try {
      const obj = { user };
      const resp = await getAllChatsForSeller(campId, obj);
      setAllUsersChat(resp);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (user) fetchAllChatData();
  }, [user]);

  useEffect(() => {
    if (selectUser !== "") fetchData();
    else {
      setChatMessages([]);
      setCost(0);
    }
  }, [selectUser, allUsersChat]);

  return (
    <div>
      <select
        value={selectUser}
        onChange={(e) => {
          setSelectUser(e.target.value);
        }}
        style={styles.select}
      >
        <option value="">None</option>
        {allUsersChat?.map((user) => (
          <option key={user.sender._id} value={user.sender._id}>
            {user.sender.username}
          </option>
        ))}
      </select>
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
                disabled={true}
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
                          textAlign: msg.isAuthor ? "right" : "left",
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
    </div>
  );
};

const styles = {
  chatContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f7f9fc",
    padding: "20px",
  },
  card: {
    width: "100%",
    maxWidth: "600px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
  },
  cardHeader: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "15px",
    fontSize: "22px",
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
    padding: "12px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  chatMessages: {
    marginBottom: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "15px",
    backgroundColor: "#f1f1f1",
  },
  messageList: {
    listStyleType: "none",
    padding: 0,
    margin: 0,
  },
  messageItem: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
    borderRadius: "5px",
    marginBottom: "5px",
  },
  textarea: {
    width: "100%",
    padding: "12px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginBottom: "10px",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
  select: {
    width: "100%",
    padding: "12px",
    marginBottom: "20px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
};

export default ChatBoxAdmin;
