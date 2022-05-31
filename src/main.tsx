import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./styles/globals.scss";
import { store } from "./store/store";
import App from "./pages/App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
