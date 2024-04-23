import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthContextProvider } from "./contexts/AuthContext.jsx";
import { CartContextProvider } from "./contexts/CartContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SearchContextProvider } from "./contexts/SearchContext.jsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <SearchContextProvider>
          <CartContextProvider>
            <App />
          </CartContextProvider>
        </SearchContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
