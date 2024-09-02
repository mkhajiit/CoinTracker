// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import { Title, Container, Header, CoinList, Coin, Img } from './Coins.styles';
import { Link } from 'react-router-dom';
import defaultImage from './defaultImage.jpg';
import { useQuery } from 'react-query';
import { fetchCoins } from '../api';
import { Helmet } from 'react-helmet';
import { useSetRecoilState } from 'recoil';
import { isDarkAtom } from './atom';

interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

export default function Coins() {
  //react-query 사용 x
  // const [coins, setCoins] = useState<CoinInterface[]>([]); // 배열의 타입을 지정할때 [] 반드시 붙여야함
  // const [loading, setLoading] = useState(true);

  //axios 사용
  // const getCoins = async () => {
  //   const res = await axios('https://api.coinpaprika.com/v1/coins');
  //   setCoins(res.data.slice(0, 50));
  //   setLoading(false);
  // };

  // useEffect(() => {
  //   // (function)()즉시실행함수 fetch 사용

  //   //   (
  //   //     async () => {
  //   //     const response = await fetch('https://api.coinpaprika.com/v1/coins');
  //   //     const json = await response.json();
  //   //     console.log(json);
  //   //     setCoins(json.slice(0, 100));
  //   //     setLoading(false);
  //   //   }
  //   // )();
  //   // getCoins();
  // }, []);

  //react-query 사용
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
  const { isLoading, data } = useQuery<CoinInterface[]>(['allCoins'], fetchCoins);
  return (
    <Container>
      <Helmet>
        <title>코인</title>
        <link rel='icon' href={defaultImage} sizes='16x16'></link>
      </Helmet>
      <Header>
        <Title>코인</Title>
        <button onClick={toggleDarkAtom}>Toggle Mode</button>
      </Header>
      {isLoading ? (
        'Loading ...'
      ) : (
        <CoinList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link to='new-path' state={{ some: 'value' }} />
              {/* 6버전 이상의 react-router-dom 에서는 리터럴을 지원안해서 아래방법으로 처리함 */}
              <Link
                to={`/${coin.id}`}
                state={{ name: coin.name, symbol: coin.symbol.toLowerCase() }}
              >
                <Img
                  src={`https://cryptoicon-api.pages.dev/api/icon/${coin.symbol.toLowerCase()}`}
                  onError={(e) => (e.currentTarget.src = defaultImage)}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  );
}
