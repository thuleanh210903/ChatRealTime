import { Navigate } from 'react-router-dom';

import { useUser } from '../../context/UserProvider';

export const PrivateRouter = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useUser();

  return isAuthenticated ? <>{children}</> : <Navigate to={'/auth/register'} />;
};
