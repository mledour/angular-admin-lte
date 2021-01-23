import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, PRIMARY_OUTLET, Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';


export interface Path {
  data: object;
  params: object;
  url: string | null;
}


export interface Paths extends Array<Path> {}


@Injectable()
export class RoutingService {
  public onChange = new BehaviorSubject<Paths | undefined>(undefined);
  public events = new BehaviorSubject<NavigationEnd | undefined>(undefined);

  constructor(
    private router: Router
  ) {
    this.init();
  }

  private static createUrl(route: ActivatedRouteSnapshot): string {
    const url = route.url.map(urlSegment => urlSegment.toString()).join('/');
    return url;
  }

  private static isChildrenSelfRoute(route: ActivatedRouteSnapshot): boolean {
    let test = false;

    route?.routeConfig?.children?.forEach(child => {
      if (child.path === '' && (child.component || child.loadChildren)) {
        test = true;
      }
    });

    return test;
  }

  private static createBreadcrumb(route: ActivatedRouteSnapshot, url: string): Path {
    let isUrl = true;

    if (route.children.length !== 0 && route?.firstChild?.routeConfig?.path) {
      if (url !== '/' && !route?.routeConfig?.loadChildren
        && !route?.routeConfig?.component && !RoutingService.isChildrenSelfRoute(route)) {
        isUrl = false;
      }
    }

    return {
      data: route.data,
      params : route.params,
      url: isUrl ? url : null
    };
  }

  private init(): void {
    this.router.events.subscribe(routeEvent => {
      // https://github.com/angular/angular/issues/17473: event not fired anymore on load for routed component.
      if (routeEvent instanceof NavigationEnd) {
        this.events.next(routeEvent);
        let route = this.router.routerState.root.snapshot;
        let tmpUrl = '';
        let url = '';
        let rootRoot = true;

        const paths: Paths = [];

        while (route.children.length) {
          route = route.firstChild || route;
          tmpUrl = `/${RoutingService.createUrl(route)}`;

          if (route.outlet !== PRIMARY_OUTLET || (!route?.routeConfig?.path && !rootRoot)) {
            continue;
          }

          rootRoot = false;

          if (route.params && route.data) {
            for (const key in route.params) {
              if (!key) { continue; }
              if (route.data.hasOwnProperty('title')) {
                route.data.title = route.data.title.replace(`:${key}`, route.params[key]);
                route.data.title = route.data.title.replace(`:${key}`, route.params[key]);
              }
              if (route.data.hasOwnProperty('breadcrumbs')) {
                route.data.breadcrumbs = route.data.breadcrumbs.replace(`:${key}`, route.params[key]);
              }
              if (route.data.hasOwnProperty('description')) {
                route.data.description = route.data.description.replace(`:${key}`, route.params[key]);
              }
            }
          }

          if (tmpUrl === '/') {
            paths.push(RoutingService.createBreadcrumb(route, tmpUrl));
          } else {
            url += tmpUrl;
            paths.push(RoutingService.createBreadcrumb(route, url));
          }
        }

        this.onChange.next(paths);
      }
    });
  }
}
