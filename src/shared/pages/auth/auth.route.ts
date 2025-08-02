import { lazy } from 'react';
import type { PageRoute } from '../../../core/router/router.interface';
import { AppRoutes } from '../../constants/app-routes';

const Auth = lazy(() => import('./Auth'));
const Register = lazy(() => import('./container/Register'));
const Login = lazy(() => import('./container/Login'));

const authRoutes: PageRoute[] = [
  {
    path: AppRoutes.AUTH,
    element: Auth,
    children: [
      {
        path: AppRoutes.REGISTER,
        element: Register,
      },
      {
        path: AppRoutes.LOGIN,
        element: Login,
      },
    ],
  },
];

export default authRoutes;
