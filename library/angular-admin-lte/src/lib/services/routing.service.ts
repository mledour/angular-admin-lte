import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Event as RouterEvent, NavigationEnd, PRIMARY_OUTLET, Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';

/*
 *
 */
export interface Path {
  data: Object;
  params: Object;
  url: string;
}

/*
 *
 */
export interface Paths extends Array<Path> {}


/*
 *
 */
@Injectable()
export class RoutingService {
  public onChange: BehaviorSubject<Paths> = new BehaviorSubject(undefined);
  public events: BehaviorSubject<RouterEvent> = new BehaviorSubject(undefined);

  /**
   * @method constructor
   * @param router [description]
   */
  constructor(
    private router: Router
  ) {
    this.init();
  }

  /**
   * [createUrl description]
   * @method createUrl
   * @param route [description]
   * @return [description]
   */
  private static createUrl(route: ActivatedRouteSnapshot): string {
    const url = route.url.map(urlSegment => urlSegment.toString()).join('/');
    return url;
  }

  /**
   * [isChildrenSelfRoute description]
   * @method isChildrenSelfRoute
   * @param route [description]
   * @return [description]
   */
  private static isChildrenSelfRoute(route: ActivatedRouteSnapshot): boolean {
    route.routeConfig.children.forEach(child => {
      if (child.path === '' && (child.component || child.loadChildren)) {
        return true;
      }
    });

    return false;
  }

  /**
   * [createBreadcrumb description]
   * @method createBreadcrumb
   * @param route [description]
   * @param url   [description]
   * @return [description]
   */
  private static createBreadcrumb(route: ActivatedRouteSnapshot, url: string): Path {
    let isUrl = true;

    if (route.children.length !== 0 && route.firstChild.routeConfig.path) {
      if (url !== '/' && !route.routeConfig.loadChildren && !route.routeConfig.component && !RoutingService.isChildrenSelfRoute(route)) {
        isUrl = false;
      }
    }

    return {
      data: route.data,
      params : route.params,
      url: isUrl ? url : null
    };
  }


  /**
   * [init description]
   * @method init
   */
  private init(): void {
    this.router.events.subscribe(routeEvent => {
      // https://github.com/angular/angular/issues/17473: event not fired anymore on load for routed component.
      if (routeEvent instanceof NavigationEnd) {
        this.events.next(routeEvent);
        let route = this.router.routerState.root.snapshot,
          tmpUrl = '',
          url = '',
          rootRoot = true;

        const paths: Paths = [];

        while (route.children.length) {
          route = route.firstChild;
          tmpUrl = `/${RoutingService.createUrl(route)}`;

          if (route.outlet !== PRIMARY_OUTLET || (!route.routeConfig.path && !rootRoot)) {
            continue;
          }

          rootRoot = false;

          if (route.params || route.data) {
            for (const key in route.params) {
              if (!key) { continue; }
              if (route.data['title']) {
                route.data['title'] = route.data['title'].replace(`:${key}`, route.params[key]);
                route.data['title'] = route.data['title'].replace(`:${key}`, route.params[key]);
              }
              if (route.data['breadcrumbs']) {
                route.data['breadcrumbs'] = route.data['breadcrumbs'].replace(`:${key}`, route.params[key]);
              }
              if (route.data['description']) {
                route.data['description'] = route.data['description'].replace(`:${key}`, route.params[key]);
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
