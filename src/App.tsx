import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WagmiProvider } from 'wagmi';
import { config } from './config/wagmi';
import { Navbar } from './components/Navbar';
import Home from "./pages/Home";
import Event from "./pages/Event";
import Create from "./pages/Create";
import Profile from "./pages/Profile";
import ManageEvents from "./pages/ManageEvents";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Navbar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/event/:id" element={<Event />} />
                  <Route path="/create" element={<Create />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/manage" element={<ManageEvents />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default App;
