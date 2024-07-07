import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Title, Container, Header, Overview, OverviewItem, Description } from './Coins.styles';
import axios from 'axios';

interface RouterState {
  name: string;
}
// alt+ shift + i 하면 선택된 모든줄 끝에 커서 생성
interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  links: object;
  links_extended: object;
  whitepaper: object;
  first_data_at: string;
  last_data_at: string;
}
// gpt에게 data 기반으로 interface를 작성하게 해서 나온 결과물
interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_15m: number;
      percent_change_30m: number;
      percent_change_1h: number;
      percent_change_6h: number;
      percent_change_12h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      percent_change_1y: number;
      ath_price: number;
      ath_date: string;
      percent_from_price_ath: number;
    };
  };
}

export default function Coin() {
  const { coinId } = useParams<{ coinId: string }>(); // 구조 분해 할당 coin의 coinId를 받아옴
  // const { coinId:coinName } = useParams(); 구조 분해 할당 후 변수 이름을 변경하는 방법
  // React Router v6에서는 useParams 훅을 사용할 때 타입스크립트와 함께 더 간단하게 사용할 수 있습니다. useParams 훅은 반환된 값이 기본적으로 Record<string, string | undefined> 형식
  const [loading, setLoading] = useState(true);
  const [coinInfo, setCoinInfo] = useState<IInfoData>();
  const [priceInfo, setPriceInfo] = useState<IPriceData>();

  //Coin의 상세정보를 받아오는 함수
  const getCoins = useCallback(async () => {
    const res = await axios(`https://api.coinpaprika.com/v1/coins/${coinId}`);
    const coinData = res.data;
    console.log(coinData);
    setCoinInfo(coinData);
  }, [coinId]);

  //Coin의 가격정보를 받아오는 함수
  const getPrice = useCallback(async () => {
    const res = await axios(`https://api.coinpaprika.com/v1/tickers/${coinId}`);
    const priceData = res.data;
    console.log(priceData);
    setPriceInfo(priceData);
  }, [coinId]);

  const location = useLocation();
  const { name } = location.state as RouterState; // state에서 받아온 name을 구조분해 할당

  useEffect(() => {
    getCoins();
    getPrice();
    setLoading(false);
  }, [getCoins, getPrice]);

  return (
    <Container>
      <Header>
        <Title>{name ? name : loading ? 'Loading...' : coinInfo?.name}</Title>
      </Header>
      {loading ? (
        'Loading ...'
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{coinInfo?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${coinInfo?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Open Source:</span>
              <span>{coinInfo?.open_source ? 'Yes' : 'No'}</span>
            </OverviewItem>
          </Overview>
          <Description>{coinInfo?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Supply:</span>
              <span>{priceInfo?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{priceInfo?.max_supply}</span>
            </OverviewItem>
          </Overview>
        </>
      )}
    </Container>
  );
}
