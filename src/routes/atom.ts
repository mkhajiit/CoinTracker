import { atom } from 'recoil';
//recoil 의 atom 만드는법
export const isDarkAtom = atom({
  key: 'isDark', // 키
  default: true, // 기본값
});
