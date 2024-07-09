import axios from 'axios';

const BASE_URL = 'https://api.coinpaprika.com/v1';

export const fetchCoins = async () => {
  return axios.get(`${BASE_URL}/coins`).then((res) => res.data);
};

// export function fetchCoins() {
//   return axios.get(`${BASE_URL}/coins`).then((res) => res.data);
// }

export const fetchCoinInfo = async (coinId?: string | undefined) => {
  return axios.get(`${BASE_URL}/coins/${coinId}`).then((res) => res.data);
};

export const fetchCoinTickers = async (coinId?: string | undefined) => {
  return axios.get(`${BASE_URL}/tickers/${coinId}`).then((res) => res.data);
};
