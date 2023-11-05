import React,{ useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Productos from './pages/Productos';
import Producto from './pages/ProductoList';
import Login from './pages/Login';

function App() {

  const [userRol, setUserRol] = useState('');
  
  return (
    <Router>
      <Routes>  
        <Route path="/" element={<Login setRol={setUserRol} />} />
        <Route path="/home" element={<Home rol={userRol} />} />
        <Route path="/about" element={<About rol={userRol} />} />
        <Route path="/producto" element={<Productos rol={userRol} />} />
        <Route path="/productolist" element={<Producto rol={userRol} />} />
      </Routes>
    </Router>
  );
}

export default App;