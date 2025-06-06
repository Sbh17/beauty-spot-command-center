
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { ConsoleLayout } from "@/components/layout/ConsoleLayout";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/admin/Users";
import Salons from "./pages/admin/Salons";
import Analytics from "./pages/admin/Analytics";
import Requests from "./pages/admin/Requests";
import Settings from "./pages/admin/Settings";
import OwnerSalons from "./pages/owner/Salons";
import OwnerAppointments from "./pages/owner/Appointments";
import OwnerStaff from "./pages/owner/Staff";
import OwnerAnalytics from "./pages/owner/Analytics";
import OwnerProfile from "./pages/owner/Profile";
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
              
              {/* Admin-only routes */}
              <Route path="/admin/users" element={
                <ProtectedRoute requiredRole="admin">
                  <Users />
                </ProtectedRoute>
              } />
              <Route path="/admin/salons" element={
                <ProtectedRoute requiredRole="admin">
                  <Salons />
                </ProtectedRoute>
              } />
              <Route path="/admin/analytics" element={
                <ProtectedRoute requiredRole="admin">
                  <Analytics />
                </ProtectedRoute>
              } />
              <Route path="/admin/requests" element={
                <ProtectedRoute requiredRole="admin">
                  <Requests />
                </ProtectedRoute>
              } />
              <Route path="/admin/settings" element={
                <ProtectedRoute requiredRole="admin">
                  <Settings />
                </ProtectedRoute>
              } />
              
              {/* Salon owner routes */}
              <Route path="/owner/salons" element={
                <ProtectedRoute requiredRole="owner" requireSalonAccess={true}>
                  <OwnerSalons />
                </ProtectedRoute>
              } />
              <Route path="/owner/appointments" element={
                <ProtectedRoute requiredRole="owner" requireSalonAccess={true}>
                  <OwnerAppointments />
                </ProtectedRoute>
              } />
              <Route path="/owner/staff" element={
                <ProtectedRoute requiredRole="owner" requireSalonAccess={true}>
                  <OwnerStaff />
                </ProtectedRoute>
              } />
              <Route path="/owner/analytics" element={
                <ProtectedRoute requiredRole="owner" requireSalonAccess={true}>
                  <OwnerAnalytics />
                </ProtectedRoute>
              } />
              <Route path="/owner/profile" element={
                <ProtectedRoute requiredRole="owner">
                  <OwnerProfile />
                </ProtectedRoute>
              } />
              
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
