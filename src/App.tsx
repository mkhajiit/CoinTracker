import { useState } from 'react';
import Router from './Router';
import GlobalStyle from './app.styles';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './theme';
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from './routes/atom';

function App() {
  const isDark = useRecoilValue(isDarkAtom);
  return (
    <div>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        {/* <button onClick={toggleDark}>Toggle Mode</button> */}
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </div>
  );
}

export default App;
