import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.tsx";
import { Toaster } from "./components/ui/sonner.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import "./index.css";
import ScrollToTop from "./components/partials/ScrollToTop.tsx";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <App />
          <Toaster position="top-right" />
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
);
