
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ConsoleLayout } from "@/components/layout/ConsoleLayout";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/admin/Users";
import Salons from "./pages/admin/Salons";
import Analytics from "./pages/admin/Analytics";
import Requests from "./pages/admin/Requests";
import Settings from "./pages/admin/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ConsoleLayout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/admin/users" element={<Users />} />
              <Route path="/admin/salons" element={<Salons />} />
              <Route path="/admin/analytics" element={<Analytics />} />
              <Route path="/admin/requests" element={<Requests />} />
              <Route path="/admin/settings" element={<Settings />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ConsoleLayout>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
