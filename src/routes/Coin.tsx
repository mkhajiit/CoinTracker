import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Title, Container, Header } from './Coins.styles';
import axios from 'axios';

interface RouterState {
  name: string;
}

export default function Coin() {
  const { coinId } = useParams<{ coinId: string }>(); // 구조 분해 할당 coin의 coinId를 받아옴
  // const { coinId:coinName } = useParams(); 구조 분해 할당 후 변수 이름을 변경하는 방법
  // React Router v6에서는 useParams 훅을 사용할 때 타입스크립트와 함께 더 간단하게 사용할 수 있습니다. useParams 훅은 반환된 값이 기본적으로 Record<string, string | undefined> 형식
  const [loading, setLoading] = useState(true);

  //Coin의 상세정보를 받아오는 함수
  const getCoins = useCallback(async () => {
    const coinData = await axios(`https://api.coinpaprika.com/v1/coins/${coinId}`);
    console.log(coinData);
    setLoading(false);
  }, [coinId]);

  //Coin의 가격정보를 받아오는 함수
  const getPrice = useCallback(async () => {
    const priceData = await axios(`https://api.coinpaprika.com/v1/tickers/${coinId}`);
    console.log(priceData);
  }, [coinId]);
  const location = useLocation();
  const { name } = location.state as RouterState; // state에서 받아온 name을 구조분해 할당

  useEffect(() => {
    getCoins();
    getPrice();
  }, [getCoins, getPrice]);

  return (
    <Container>
      <Header>
        <Title>{name}</Title>
      </Header>
      {loading ? 'Loading ...' : null}
    </Container>
  );
}
