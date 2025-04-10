import { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import ChatRoom from "./components/ChatRoom";
import NameForm from "./components/NameForm";

function App() {
  const [name, setName] = useState("");
  const [pendingRoom, setPendingRoom] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const roomFromUrl = location.pathname.slice(1);
    if (!name && roomFromUrl) {
      setPendingRoom(roomFromUrl);
      navigate("/");
    }
  }, [name, location.pathname, navigate]);

  return (
    <Routes>
      <Route
        path="/"
        element={<NameForm setName={setName} pendingRoom={pendingRoom} />}
      />
      <Route path="/:roomId" element={<ChatRoom name={name} />} />
    </Routes>
  );
}

export default App;
