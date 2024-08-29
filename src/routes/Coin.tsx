// import React, { useCallback, useEffect, useState } from 'react';
import { Outlet, useLocation, useMatch, useParams } from 'react-router-dom';
import {
  Title,
  Container,
  Header,
  Overview,
  OverviewItem,
  Description,
  Tabs,
  Tab,
} from './Coins.styles';
import { Link } from 'react-router-dom';
import { fetchCoinInfo, fetchCoinTickers } from '../api';
import { useQuery } from 'react-query';
import { Helmet } from 'react-helmet';

interface RouteState {
  state: {
    name: string;
    symbol: string;
  };
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

  //react query 사용 x

  // const [loading, setLoading] = useState(true);
  // const [infoData, setCoinInfo] = useState<IInfoData>();
  // const [priceData, setPriceInfo] = useState<IPriceData>();
  const chartMatch = useMatch('/:coinId/chart'); // /:coinId 라는 패턴이 필요한거라 백틱안에 쓸필요없음 굳이 coinId가 아니어도 된다는 소리
  const priceMatch = useMatch('/:coinId/price');
  // //Coin의 상세정보를 받아오는 함수
  // const getCoins = useCallback(async () => {
  //   const res = await axios(`https://api.coinpaprika.com/v1/coins/${coinId}`);
  //   const coinData = res.data;
  //   setCoinInfo(coinData);
  // }, [coinId]);

  // //Coin의 가격정보를 받아오는 함수
  // const getPrice = useCallback(async () => {
  //   const res = await axios(`https://api.coinpaprika.com/v1/tickers/${coinId}`);
  //   const priceData = res.data;
  //   setPriceInfo(priceData);
  // }, [coinId]);

  const { state } = useLocation() as RouteState;

  // useEffect(() => {
  //   getCoins();
  //   getPrice();
  //   setLoading(false);
  // }, [getCoins, getPrice]);

  //react query 사용

  const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(['info', coinId], () =>
    fetchCoinInfo(coinId)
  );

  const { isLoading: tickersLoading, data: priceData } = useQuery<IPriceData>(
    ['price', coinId],
    () => fetchCoinTickers(coinId)
    // {
    //   refetchInterval: 10000, //10000밀리초(10초)마다 fetch를 하도록 설정 coin파프리카의 무료 fetch 제한 때문에 주석처리함
    // }
  );

  const loading = infoLoading || tickersLoading;
  return (
    <Container>
      <Helmet>
        <title>{state?.name ? state.name : loading ? 'loading...' : infoData?.name}</title>
        <link
          rel='icon'
          type='image/png'
          href={`https://cryptoicon-api.pages.dev/api/icon/${state?.symbol ?? ''}`}
          sizes='16x16'
        ></link>
      </Helmet>
      <Header>
        <Title>{state?.name ? state.name : loading ? 'loading...' : infoData?.name}</Title>
      </Header>
      {loading ? (
        'Loading ...'
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>${priceData?.quotes?.USD?.price?.toFixed(3)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Supply:</span>
              <span>{priceData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{priceData?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab $isActive={chartMatch !== null}>
              <Link to='chart'>Chart</Link>
            </Tab>
            <Tab $isActive={priceMatch !== null}>
              <Link to='price'>Price</Link>
            </Tab>
          </Tabs>
          {/* 둘다 /coinId/price처럼 이동 가능
          <Link to='chart'>Chart</Link>
          <Link to={`/${coinId}/price`}>Price</Link> */}

          {/* Warning : React does not recognize the `isActive` prop on a DOM element. If you
          intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase
          `isactive` instead. If you accidentally passed it from a parent component, remove it from
          the DOM element. 해결: isActive에 $붙여서 $isActive로 전부 변경해서 해결 */}
          <Outlet context={{ coinId }} />
        </>
      )}
    </Container>
  );
}
