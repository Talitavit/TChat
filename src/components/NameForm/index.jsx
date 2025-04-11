import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

function NameForm({ setName, pendingRoom }) {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState(pendingRoom || "");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setName(username);
    localStorage.setItem("username", username);
    navigate(`/${room}`);
  };

  return (
    <div className={styles.mascot}>
      <img src="./mascot.png" alt="mascot" className={styles.foto} />

      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <h2 className={styles.title}>Entrar no Chat</h2>

        <input
          type="text"
          placeholder="Seu nome"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles.input}
          required
        />

        <input
          type="text"
          placeholder="Nome da sala (ex: estudo)"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          className={styles.input}
          required
        />

        <button type="submit" className={styles.button}>
          Entrar
        </button>
      </form>
    </div>
  );
}

export default NameForm;
