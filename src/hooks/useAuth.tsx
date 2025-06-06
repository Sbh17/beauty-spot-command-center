
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
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
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  console.log('AuthProvider render, current user:', user);

  // Initialize user from localStorage on mount
  useEffect(() => {
    console.log('AuthProvider initializing...');
    try {
      const savedUser = localStorage.getItem('haib_user');
      console.log('Saved user from localStorage:', savedUser);
      
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        console.log('Restoring user from localStorage:', parsedUser);
        setUser(parsedUser);
      }
    } catch (error) {
      console.error('Error parsing saved user:', error);
      localStorage.removeItem('haib_user');
    }
    setIsLoading(false);
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      if (user) {
        console.log('Saving user to localStorage:', user);
        localStorage.setItem('haib_user', JSON.stringify(user));
      } else {
        console.log('Removing user from localStorage');
        localStorage.removeItem('haib_user');
      }
    }
  }, [user, isLoading]);

  // Auto-set currentSalonId if user has salon access but no currentSalonId
  useEffect(() => {
    if (user && user.role === 'owner' && user.salonIds?.length && !user.currentSalonId) {
      console.log('Auto-setting currentSalonId for owner:', user.salonIds[0]);
      setUser(prev => prev ? { ...prev, currentSalonId: user.salonIds[0] } : null);
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    console.log('Login attempt for:', email);
    // Mock login logic - replace with actual authentication
    if (email === 'admin@beautyspot.com') {
      const adminUser = {
        id: '1',
        name: 'John Admin',
        email: 'admin@beautyspot.com',
        role: 'admin' as UserRole
      };
      console.log('Setting admin user:', adminUser);
      setUser(adminUser);
    } else if (email === 'owner@salon.com') {
      const ownerUser = {
        id: '2',
        name: 'Jane Owner',
        email: 'owner@salon.com',
        role: 'owner' as UserRole,
        salonIds: ['salon-1', 'salon-2'], // Multiple salons access
        currentSalonId: 'salon-1'
      };
      console.log('Setting owner user:', ownerUser);
      setUser(ownerUser);
    } else if (email === 'single-owner@salon.com') {
      const singleOwnerUser = {
        id: '3',
        name: 'Mike Owner',
        email: 'single-owner@salon.com',
        role: 'owner' as UserRole,
        salonIds: ['salon-3'],
        currentSalonId: 'salon-3'
      };
      console.log('Setting single owner user:', singleOwnerUser);
      setUser(singleOwnerUser);
    } else {
      console.log('Invalid credentials for:', email);
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    console.log('Logging out user');
    setUser(null);
  };

  const hasRole = (role: UserRole) => {
    const result = user?.role === role;
    console.log('hasRole check:', { userRole: user?.role, requiredRole: role, result });
    return result;
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

  const contextValue = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    hasRole,
    canAccessSalon,
    switchSalon,
    isAdmin: user?.role === 'admin',
    isSalonOwner: user?.role === 'owner'
  };

  console.log('AuthProvider context value:', contextValue);

  // Don't render children until we've tried to restore from localStorage
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={contextValue}>
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
