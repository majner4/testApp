import React from "react";
import ReactDOM from "react-dom";
import { SnackbarProvider } from "notistack";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import UserDataProvider from "./contexts/userContext";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={3}>
      <UserDataProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserDataProvider>
    </SnackbarProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
