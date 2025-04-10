// src/components/NameForm.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NameForm({ setName }) {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("username", username);
    setName(username);
    navigate(`/${room}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Entrar no Chat</h2>
      <input
        type="text"
        placeholder="Seu nome"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Nome da sala (ex: estudo)"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
        required
      />
      <button type="submit">Entrar</button>
    </form>
  );
}

export default NameForm;
