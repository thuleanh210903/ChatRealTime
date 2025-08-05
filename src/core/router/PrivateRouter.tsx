import { Navigate } from 'react-router-dom';

import { AppRoutes } from '../../shared/constants/app-routes';
import { getDataFromLocalStorage, KEYS } from '../helpers/storage.helper';

export const PrivateRouter = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = getDataFromLocalStorage(KEYS.USER_SESSION, null);
  return isAuthenticated ? (
    <Navigate to={AppRoutes.HOME} />
  ) : (
    <Navigate to={AppRoutes.REGISTER} />
  );
};
