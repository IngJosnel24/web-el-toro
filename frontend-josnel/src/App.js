import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Productos from './pages/Productos';
import Producto from './pages/ProductoList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/producto" element={<Productos />} />
        <Route path="/productolist" element={<Producto />} />
      </Routes>
    </Router>
  );
}

export default App;