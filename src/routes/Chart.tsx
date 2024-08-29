import { useQuery } from 'react-query';
import { useOutletContext } from 'react-router-dom';
import { fetchCoinHistory } from '../api';
import ApexCharts from 'react-apexcharts';
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from './atom';

interface ChartProps {
  coinId: string;
}

interface IHistorical {
  close: number;
  high: number;
  low: number;
  market_cap: number;
  open: number;
  volume: number;
  time_close: string;
  time_open: string;
}

export default function Chart() {
  const { coinId } = useOutletContext<ChartProps>();
  const { isLoading, data } = useQuery<IHistorical[]>(
    ['ohlcv', coinId],
    () => fetchCoinHistory(coinId)
    // {
    //   refetchInterval: 10000,
    // }
  );
  const isDark = useRecoilValue(isDarkAtom);
  return (
    <div>
      {isLoading ? (
        'Loading chart...'
      ) : (
        <ApexCharts
          type='line'
          series={[{ name: 'Price', data: data?.map((price) => Number(price.close)) ?? [] }]} // api가 string으로 되어있어서 Number를 이용해서 숫자로 변환했다
          options={{
            chart: {
              height: 500,
              width: 500,
              toolbar: { show: false },
              background: 'transparent',
            },
            grid: {
              show: false,
            },
            theme: { mode: isDark ? 'dark' : 'light' },
            stroke: { curve: 'smooth', width: 4 },
            xaxis: { axisTicks: { show: false }, labels: { show: false } },
            yaxis: { show: false },
          }}
        />
      )}
    </div>
  );
}
