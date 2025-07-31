import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { renderChildren } from './core/router/RouterOutlet';

import appRouter from './app.router';

function App() {
  const routers = renderChildren(appRouter);
  const element = useRoutes(routers);
  return <Suspense fallback={<div>Loading...</div>}>{element}</Suspense>;
}

export default App;
