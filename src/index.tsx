import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./Frontend/App";
import reportWebVitals from "./reportWebVitals";
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { UserPreferencesContextProvider } from './Frontend/Providers/UserPreferencesProvider';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <UserPreferencesContextProvider initialPreferences={{
        showDebug: false,
        showInfoPanel: true,
      }}>

        <App />
      </UserPreferencesContextProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
