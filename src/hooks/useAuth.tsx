
import { createContext, useContext, useState, ReactNode } from 'react';
import { UserRole } from '@/types/console';

interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
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
        role: 'owner'
      });
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user
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
