
import { createContext, useContext, useState, ReactNode } from 'react';
import { UserRole } from '@/types/console';

interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  salonIds?: string[]; // Array of salon IDs the user has access to
  currentSalonId?: string; // Currently selected salon for salon owners
}

interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  hasRole: (role: UserRole) => boolean;
  canAccessSalon: (salonId: string) => boolean;
  switchSalon: (salonId: string) => void;
  isAdmin: boolean;
  isSalonOwner: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>({
    id: '1',
    name: 'John Admin',
    email: 'admin@beautyspot.com',
    role: 'admin'
  });

  const login = async (email: string, password: string) => {
    // Mock login logic - replace with actual authentication
    if (email === 'admin@beautyspot.com') {
      setUser({
        id: '1',
        name: 'John Admin',
        email: 'admin@beautyspot.com',
        role: 'admin'
      });
    } else if (email === 'owner@salon.com') {
      setUser({
        id: '2',
        name: 'Jane Owner',
        email: 'owner@salon.com',
        role: 'owner',
        salonIds: ['salon-1', 'salon-2'], // Multiple salons access
        currentSalonId: 'salon-1'
      });
    } else if (email === 'single-owner@salon.com') {
      setUser({
        id: '3',
        name: 'Mike Owner',
        email: 'single-owner@salon.com',
        role: 'owner',
        salonIds: ['salon-3'],
        currentSalonId: 'salon-3'
      });
    }
  };

  const logout = () => {
    setUser(null);
  };

  const hasRole = (role: UserRole) => {
    return user?.role === role;
  };

  const canAccessSalon = (salonId: string) => {
    if (!user) return false;
    if (user.role === 'admin') return true;
    return user.salonIds?.includes(salonId) || false;
  };

  const switchSalon = (salonId: string) => {
    if (user && canAccessSalon(salonId)) {
      setUser({ ...user, currentSalonId: salonId });
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user,
      hasRole,
      canAccessSalon,
      switchSalon,
      isAdmin: user?.role === 'admin',
      isSalonOwner: user?.role === 'owner'
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
