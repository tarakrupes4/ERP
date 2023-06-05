import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Inward from './pages/Inward/Inward';
import 'bootstrap/dist/css/bootstrap.min.css';
import ItemDetails from './pages/Inward/ItemDetails';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login setLoggedIn={setLoggedIn} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/inward" element={<Inward />} />
        <Route path="/inwardDetails" element={<ItemDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
