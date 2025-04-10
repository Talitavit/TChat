// src/components/ChatRoom.js
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot
} from 'firebase/firestore';
import { db } from '../firebase';

function ChatRoom({ name }) {
  const { roomId } = useParams();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, 'chats', roomId, 'messages'),
      orderBy('timestamp')
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => doc.data()));
    });

    return () => unsubscribe();
  }, [roomId]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    await addDoc(collection(db, 'chats', roomId, 'messages'), {
      text: message,
      sender: name,
      timestamp: serverTimestamp()
    });

    setMessage('');
  };

  return (
    <div>
      <h2>Sala: {roomId}</h2>
      <div style={{ maxHeight: 300, overflowY: 'scroll', border: '1px solid #ccc', marginBottom: 10 }}>
        {messages.map((msg, index) => (
          <p key={index}><strong>{msg.sender}:</strong> {msg.text}</p>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="Digite sua mensagem..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default ChatRoom;
