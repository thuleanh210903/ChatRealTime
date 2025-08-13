import { lazy } from 'react';
import type { PageRoute } from '../../../core/router/router.interface';
import { AppRoutes } from '../../constants/app-routes';

const Home = lazy(() => import('./Home'));

const homeRoutes: PageRoute[] = [
  {
    path: AppRoutes.HOME,
    element: Home,
    isProtected: true,
  },
];

export default homeRoutes;
