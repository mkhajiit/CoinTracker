import styled from 'styled-components';

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinList = styled.ul``;

const Img = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;

// Link 는 a로 변환 되기 때문에 a의 스타일을 변경하면 Link가 바뀜
const Coin = styled.li`
  background-color: white;
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.bgColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    padding: 20px;
    transition: color 0.2s ease-in;
    display: flex;
    align-items: center;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;
export { Title, Container, Header, CoinList, Coin, Img };
