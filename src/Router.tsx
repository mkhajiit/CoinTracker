import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './components/About';
import Coins from './routes/Coins';
import Coin from './routes/Coin';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Coins />} />
        <Route path='/:coinId' element={<Coin />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
