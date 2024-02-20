import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { SnackbarProvider } from "notistack";

// Specify the target container ID
const rootElement = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <SnackbarProvider
      maxSnack={1}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      preventDuplicate
    >
      <App />
    </SnackbarProvider>
  </React.StrictMode>,
  rootElement 
);
