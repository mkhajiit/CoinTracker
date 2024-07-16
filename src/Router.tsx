import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Coins from './routes/Coins';
import Coin from './routes/Coin';
import Price from './routes/Price';
import Chart from './routes/Chart';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Coins />} />
        <Route path='/:coinId' element={<Coin />}>
          <Route path='price' element={<Price />} />
          <Route path='chart' element={<Chart />} />
          {/* 주의!!! 경로앞에 / 달면 안됨 */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
