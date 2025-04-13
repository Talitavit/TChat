import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import styles from "./styles.module.css";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";

function ChatRoom({ name }) {
  const { roomId } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    const q = query(
      collection(db, "chats", roomId, "messages"),
      orderBy("timestamp")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });

    return () => unsubscribe();
  }, [roomId]);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    await addDoc(collection(db, "chats", roomId, "messages"), {
      text: message,
      sender: name,
      timestamp: serverTimestamp(),
    });

    setMessage("");
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.roomHeader}>
        <h2>Chat</h2>
        <span>{roomId}</span>
      </div>

      <div ref={messagesContainerRef} className={styles.messagesContainer}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`${styles.messageBubble} ${
              msg.sender === name ? styles.userMessage : styles.otherMessage
            }`}
          >
            <span className={styles.senderName}>
              {msg.sender === name ? "You" : msg.sender}
            </span>
            <div className={styles.messageContent}>
              <p>{msg.text}</p>
              <span className={styles.timestamp}>
                {msg.timestamp?.toDate().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} className={styles.messageForm}>
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={styles.messageInput}
          required
        />
        <button type="submit" className={styles.sendButton}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </form>
    </div>
  );
}

export default ChatRoom;
