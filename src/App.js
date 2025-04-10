// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatRoom from './components/ChatRoom';
import NameForm from './components/NameForm';
import { useState } from 'react';

function App() {
  const [name, setName] = useState(localStorage.getItem("username") || "");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<NameForm setName={setName} />} />
        <Route path="/:roomId" element={<ChatRoom name={name} />} />
      </Routes>
    </Router>
  );
}

export default App;
