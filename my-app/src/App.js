import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ButtonsScreen from './ButtonsScreen';
import Telao from './Telao';

const App = () => (
  <Router>
    <Routes>
      <Route path="/buttons" element={<ButtonsScreen />} />
      <Route path="/display" element={<Telao />} />
      <Route path="/" element={<ButtonsScreen />} />
    </Routes>
  </Router>
);

export default App;
