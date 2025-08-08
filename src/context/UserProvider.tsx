import { createContext, useContext, useState, useEffect } from 'react';
import {
  getDataFromLocalStorage,
  KEYS,
  removeDataFromLocalStorage,
  setDataToLocalStorage,
} from '../core/helpers/storage.helper';

export interface User {
  uid: string;
  email: string;
  fullName: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  isAuthenticated: false,
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUserState(JSON.parse(storedUser));
    }
  }, []);

  const setUser = (user: User | null) => {
    setUserState(user);
    if (user) {
      setDataToLocalStorage(KEYS.USER_SESSION, user);
    } else {
      removeDataFromLocalStorage(KEYS.USER_SESSION);
    }
  };

  const isAuthenticated = Boolean(
    getDataFromLocalStorage(KEYS.USER_SESSION, null)
  );

  return (
    <UserContext.Provider value={{ user, setUser, isAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
