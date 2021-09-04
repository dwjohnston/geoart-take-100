import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./Frontend/App";
import reportWebVitals from "./reportWebVitals";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { UserPreferencesContextProvider } from "./Frontend/Providers/UserPreferencesProvider";
import { GlobalControlsContextProvider } from "./Frontend/Providers/GlobalControlsProvider";
import { TrackingContextProvider } from "./Frontend/Providers/TrackingProvider";

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
  typography: {
    h1: {
      fontSize: "4rem",
      textAlign: "center",
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <TrackingContextProvider>
      <ThemeProvider theme={theme}>
        <UserPreferencesContextProvider
          initialPreferences={{
            showDebug: false,
            showInfoPanel: true,
            isPaused: false,
          }}
        >
          <GlobalControlsContextProvider>
            <App />
          </GlobalControlsContextProvider>
        </UserPreferencesContextProvider>
      </ThemeProvider>
    </TrackingContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
