import { searchFields } from './data/fields';
import MapView from './MapView';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import FieldDetail from './pages/FieldDetail';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/field/:id" element={<FieldDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
