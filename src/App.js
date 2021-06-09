import logo from './logo.svg';
import './App.css';
import Home from './Home';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import { useState } from 'react';
import { blue, indigo, amber } from '@material-ui/core/colors';

function App() {
  const [darkState, setDarkState] = useState(false);
  const palletType = darkState ? "dark" : "light";
  const theme = createMuiTheme({
    palette: {
      type: palletType,
      primary: blue,
      secondary: amber,
    },
  });
  function toggleTheme() {
    setDarkState(!darkState)
  }
  return (
    <ThemeProvider theme={theme}>
      <Home toggleTheme={toggleTheme} />
    </ThemeProvider>

  );
}

export default App;
