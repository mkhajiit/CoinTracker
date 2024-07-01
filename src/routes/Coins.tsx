import React from 'react';
import { Title, Container, Header, CoinList, Coin } from './Coins.styles';
import coins from '../data/coinData';

export default function Coins() {
  return (
    <Container>
      <Header>
        <Title>코인</Title>
      </Header>
      <CoinList>
        {coins.map((coin) => (
          <Coin key={coin.id}>{coin.name}</Coin>
        ))}
      </CoinList>
    </Container>
  );
}
