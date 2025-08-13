import { lazy } from 'react';
import type { PageRoute } from '../../core/router/router.interface';
import { AppRoutes } from '../constants/app-routes';
import homeRoutes from './home/home.route';

const Page = lazy(() => import('./Page'));
const pageRoutes: PageRoute[] = [
  {
    path: AppRoutes.HOME,
    element: Page,
    children: [...homeRoutes],
    // isProtected: true,
  },
];

export default pageRoutes;
