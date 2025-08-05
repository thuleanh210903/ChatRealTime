import type { PageRoute } from './core/router/router.interface';
import authRoutes from './shared/pages/auth/auth.route';
import homeRoutes from './shared/pages/home/home.route';

const appRouter: PageRoute[] = [...authRoutes, ...homeRoutes];
export default appRouter;
