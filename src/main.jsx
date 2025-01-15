import { QueryClient, QueryClientProvider } from "react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/index.css";
import Router from "@/routes/Router";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <Router />
        </QueryClientProvider>
    </StrictMode>
);