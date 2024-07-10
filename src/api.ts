// react-query에서 사용하는 fetch함수들
import axios from 'axios';

const BASE_URL = 'https://api.coinpaprika.com/v1';

export const fetchCoins = async () => {
  return axios.get(`${BASE_URL}/coins`).then((res) => res.data);
};

// export function fetchCoins() {
//   return axios.get(`${BASE_URL}/coins`).then((res) => res.data);
// }

//코인 세부정보fetch함수
export const fetchCoinInfo = async (coinId?: string | undefined) => {
  return axios.get(`${BASE_URL}/coins/${coinId}`).then((res) => res.data);
};
//가격 fetch함수
export const fetchCoinTickers = async (coinId?: string | undefined) => {
  return axios.get(`${BASE_URL}/tickers/${coinId}`).then((res) => res.data);
};

export const fetchCoinHistory = async (coinId?: string | undefined) => {
  return axios
    .get(`https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`)
    .then((res) => res.data);
};
