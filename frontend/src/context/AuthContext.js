import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('plan2go_user');
      if (storedUser && storedUser !== 'undefined') {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && typeof parsedUser === 'object') {
          setUser(parsedUser);
        } else {
          // Invalid object
          localStorage.removeItem('plan2go_user');
        }
      } else {
        // Remove corrupted entry
        localStorage.removeItem('plan2go_user');
      }
    } catch (err) {
      console.error('Failed to parse stored user:', err);
      localStorage.removeItem('plan2go_user');
    }
    setLoading(false);
  }, []);


  const login = async (email, password) => {
    try {
      const res = await fetch('http://localhost:8080/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (data.success && data.token) {
        localStorage.setItem('plan2go_token', data.token);

        // Fetch user profile using token
        const profileRes = await fetch('http://localhost:8080/users/profile', {
          headers: { Authorization: `Bearer ${data.token}` },
        });
        const userData = await profileRes.json();

        setUser(userData);
        localStorage.setItem('plan2go_user', JSON.stringify(userData));
        return { success: true };
      }

      return { success: false, error: data.error || 'Invalid credentials' };
    } catch (err) {
      return { success: false, error: 'Server error. Please try again.' };
    }
  };


  const register = async (formData) => {
    try {
      const res = await fetch('http://localhost:8080/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: formData.FirstName,
          last_name: formData.LastName,
          phone: formData.Phone,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await res.json();

      if (data.success) {
        setUser(data.user);
        localStorage.setItem('plan2go_user', JSON.stringify(data.user));
        localStorage.setItem('plan2go_token', data.token); // if backend returns JWT
        return { success: true };
      } else {
        return { success: false, error: data.error };
      }
    } catch (err) {
      return { success: false, error: 'Server error. Please try again.' };
    }
  };


  const logout = () => {
    setUser(null);
    localStorage.removeItem('plan2go_user');
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

