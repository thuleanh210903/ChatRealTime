import type { RouteObject } from 'react-router-dom';
import type { PageRoute } from './router.interface';
import { PrivateRouter } from './PrivateRouter';
import { GuestRouter } from './GuestRouter';

export const renderChildren = (routes: PageRoute[]): RouteObject[] => {
  return routes.map((route) => {
    let wrappedElement = route.element ? <route.element /> : undefined;

    if (wrappedElement) {
      if (route.isProtected) {
        wrappedElement = <PrivateRouter>{wrappedElement}</PrivateRouter>;
      } else if (route.isPublic) {
        wrappedElement = <GuestRouter>{wrappedElement}</GuestRouter>;
      }
    }
    return {
      ...route,
      element: wrappedElement,
      children: route.children ? renderChildren(route.children) : [],
    };
  });
};
