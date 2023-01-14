import React from "react";
import ReactDOM from "react-dom/client";

import { AuthProvider } from "./context/auth";
import { SearchProvider } from "./context/search";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <SearchProvider>
        <App />
      </SearchProvider>
    </AuthProvider>
  </React.StrictMode>
);
reportWebVitals();
