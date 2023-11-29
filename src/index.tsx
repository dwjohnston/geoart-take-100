import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./Video.css";

import reportWebVitals from "./reportWebVitals";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

import { TrackingContextProvider } from "./Frontend/Providers/TrackingProvider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Main } from "./Frontend/Pages/Main";
import { Video } from "./Frontend/Pages/Video";

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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/video",
    element: (
      <div style={{ width: 800, border: "solid 1px red" }}>
        {" "}
        <Video />
      </div>
    ),
  },
]);

ReactDOM.render(
  <React.StrictMode>
    <TrackingContextProvider>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </TrackingContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
