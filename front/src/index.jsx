import React from "react";
import { createRoot } from 'react-dom';
import App from "./App";
import "./styles/tailwind.css";
import "./styles/index.css";
import "./styles/font.css";
import AuthProvider from "./contexts/AuthProvider";
import { BrowserRouter } from "react-router-dom";
import ProjectRoutes from "Routes";

//tankstack query used to usePurchase.jsx hook working(usePurchase.jsx uses to frontend abckend connectivity)
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()


const root = createRoot(document.getElementById('root'));

root.render(
  <AuthProvider>
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <ProjectRoutes />
    </QueryClientProvider>
    </BrowserRouter>
  </AuthProvider>
);

