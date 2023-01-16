import React from "react";
import ReactDOM from "react-dom/client";

import { AuthProvider } from "./context/auth";
import { SearchProvider } from "./context/search";
import { CartProvider } from "./context/cart";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <SearchProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </SearchProvider>
    </AuthProvider>
  </React.StrictMode>
);
reportWebVitals();
