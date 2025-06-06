
import { ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { UserRole } from '@/types/console';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: UserRole;
  requireSalonAccess?: boolean;
  fallback?: ReactNode;
}

export const ProtectedRoute = ({ 
  children, 
  requiredRole, 
  requireSalonAccess = false,
  fallback 
}: ProtectedRouteProps) => {
  const { user, hasRole, isAuthenticated } = useAuth();

  console.log('ProtectedRoute Debug:', {
    isAuthenticated,
    user,
    requiredRole,
    requireSalonAccess,
    userRole: user?.role,
    salonIds: user?.salonIds,
    currentSalonId: user?.currentSalonId
  });

  if (!isAuthenticated) {
    console.log('User not authenticated, redirecting to signin');
    return <Navigate to="/signin" replace />;
  }

  if (requiredRole && !hasRole(requiredRole)) {
    console.log('User does not have required role:', requiredRole);
    return fallback || (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Access Denied
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              You don't have permission to access this page. Required role: {requiredRole}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // For salon owners, check if they have salon access
  if (requireSalonAccess && user?.role === 'owner') {
    console.log('Checking salon access for owner:', user.salonIds);
    // If they don't have any salon IDs, show no access message
    if (!user?.salonIds?.length) {
      console.log('Owner has no salon access');
      return fallback || (
        <div className="flex items-center justify-center min-h-[400px]">
          <Card className="max-w-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                No Salon Access
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                You don't have access to any salons. Please contact an administrator.
              </p>
            </CardContent>
          </Card>
        </div>
      );
    }
    console.log('Owner has salon access, allowing through');
  }

  console.log('All checks passed, rendering children');
  return <>{children}</>;
};
