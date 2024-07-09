import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token =localStorage.getItem('token')
    if (token) {
      fetchUser(JSON.parse(token));
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async (token) => {
    try {
        console.log(token)
      const response = await axios.get('http://localhost:4000/user/profile', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      console.log(response.data.user)
      setUser(response.data.user);
    } catch (error) {
      console.error('Error fetching user:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:4000/auth/login', { email, password });
      localStorage.setItem('token', JSON.stringify(response.data.token));
      await fetchUser(response.data.token);
      return response;
    } catch (error) {
      console.error('Login error:', error);
      return error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = {
    user,
    setUser,
    login,
    logout,
    isAuthenticated: !!user,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

