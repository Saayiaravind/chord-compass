import { createContext, useContext, useState, useEffect } from 'react';
import { decodeToken, getUserRole, getUserEmail } from '../utils/jwtUtils';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      const decoded = decodeToken(token);
      if (decoded?.exp && decoded.exp * 1000 < Date.now()) {
        logout();
        return;
      }
      const role = getUserRole(token);
      const email = getUserEmail(token);
      setUser({ email, role });
      localStorage.setItem('token', token);
    } else {
      setUser(null);
      localStorage.removeItem('token');
    }
  }, [token]);

  const login = (jwtToken) => {
    setToken(jwtToken);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  const isAdmin = user?.role === 'ADMIN';
  const isInstructor = user?.role === 'INSTRUCTOR';
  const isStudent = user?.role === 'STUDENT';

  return (
    <AuthContext.Provider value={{
      token, user, login, logout,
      isAdmin, isInstructor, isStudent,
      isAuthenticated: !!token && !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
