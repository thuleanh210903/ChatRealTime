import { createContext, useContext, useState, useEffect } from 'react';
import {
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
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
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

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
