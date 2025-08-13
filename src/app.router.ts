import type { PageRoute } from './core/router/router.interface';
import authRoutes from './shared/pages/auth/auth.route';
import pageRoutes from './shared/pages/page.routes';

const appRouter: PageRoute[] = [...authRoutes, ...pageRoutes];
export default appRouter;
