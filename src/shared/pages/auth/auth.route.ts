import { lazy } from 'react';
import type { PageRoute } from '../../../core/router/router.interface';
import { AppRoutes } from '../../constants/app-routes';

const Register = lazy(() => import('./container/Register'));
const Auth = lazy(() => import('./Auth'));

const authRoutes: PageRoute[] = [
  {
    path: AppRoutes.AUTH,
    element: Auth,
    children: [
      {
        path: AppRoutes.REGISTER,
        element: Register,
      },
    ],
  },
];

export default authRoutes;
