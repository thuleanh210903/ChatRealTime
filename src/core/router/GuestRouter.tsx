import type React from 'react';
import { Navigate } from 'react-router-dom';

import { getDataFromLocalStorage, KEYS } from '../helpers/storage.helper';
import { AppRoutes } from '../../shared/constants/app-routes';

export const GuestRouter = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = getDataFromLocalStorage(KEYS.USER_SESSION, null);

  return isAuthenticated ? <Navigate to={AppRoutes.HOME} /> : <>{children}</>;
};
