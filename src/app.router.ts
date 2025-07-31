import type { PageRoute } from './core/router/router.interface';
import authRoutes from './shared/pages/auth/auth.route';

const appRouter: PageRoute[] = [...authRoutes];
export default appRouter
