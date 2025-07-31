import type { RouteObject } from 'react-router-dom';
import type { PageRoute } from './router.interface';

export const renderChildren = (routes: PageRoute[]): RouteObject[] => {
  return routes.map((route) => {
    let wrappedElement = route.element ? <route.element /> : undefined;

    return {
      ...route,
      element: wrappedElement,
      children: route.children ? renderChildren(route.children) : [],
    };
  });
};
