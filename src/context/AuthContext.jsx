import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check local storage for persistent session
    const savedUser = localStorage.getItem('paw_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (email, password) => {
    // Dummy authentication
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          const userData = { id: 1, name: email.split('@')[0], email };
          setUser(userData);
          localStorage.setItem('paw_user', JSON.stringify(userData));
          resolve(userData);
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 800);
    });
  };

  const register = (name, email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (name && email && password) {
          const userData = { id: Date.now(), name, email };
          setUser(userData);
          localStorage.setItem('paw_user', JSON.stringify(userData));
          resolve(userData);
        } else {
          reject(new Error("Please fill in all fields"));
        }
      }, 800);
    });
  };

  const updateProfile = (name, email) => {
      return new Promise((resolve) => {
          setTimeout(() => {
             const updatedUser = { ...user, name, email };
             setUser(updatedUser);
             localStorage.setItem('paw_user', JSON.stringify(updatedUser));
             resolve(updatedUser);
          }, 500);
      })
  }

  const logout = () => {
    setUser(null);
    localStorage.removeItem('paw_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
