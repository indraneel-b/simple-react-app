import logo from './logo.svg';
import './App.css';
import Home from './Home';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import { useState } from 'react';

function App() {
  const [darkState, setDarkState] = useState(false);
  const palletType = darkState ? "dark" : "light";
  const theme = createMuiTheme({
    palette: {
      type: palletType,
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>

  );
}

export default App;
