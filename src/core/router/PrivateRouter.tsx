import { Navigate } from 'react-router-dom';

import { useUser } from '../../context/UserProvider';
import { AppRoutes } from '../../shared/constants/app-routes';

export const PrivateRouter = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useUser();

  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to={AppRoutes.REGISTER} />
  );
};
