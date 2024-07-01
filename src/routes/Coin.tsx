import React from 'react';
import { useParams } from 'react-router-dom';

export default function Coin() {
  const { coinId } = useParams<{ coinId: string }>(); // 구조 분해 할당
  // const { coinId:coinName } = useParams(); 구조 분해 할당 후 변수 이름을 변경하는 방법
  // React Router v6에서는 useParams 훅을 사용할 때 타입스크립트와 함께 더 간단하게 사용할 수 있습니다. useParams 훅은 반환된 값이 기본적으로 Record<string, string | undefined> 형식
  console.log(coinId);
  return (
    <div>
      <h1>Coin: {coinId}</h1>
    </div>
  );
}
