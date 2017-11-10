import { Injectable, EventEmitter, Output } from '@angular/core';
import { Router, NavigationEnd, ActivatedRouteSnapshot, ActivatedRoute, PRIMARY_OUTLET } from '@angular/router';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

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
export interface Paths extends Array<Path>{};


/*
 *
 */
@Injectable()
export class RoutingService {
  public onChange: BehaviorSubject<Paths> = new BehaviorSubject(undefined);

  /**
   * @method constructor
   * @param  {Router}    privaterouter [description]
   */
  constructor(
    private router: Router
  ) {
    this.init();
  }

  /**
   * [init description]
   * @method init
   */
  private init(): void {
    this.router.events.subscribe(routeEvent => {
      if(routeEvent instanceof NavigationEnd) {
        let route = this.router.routerState.root.snapshot,
          tmpUrl= '',
          url = '',
          paths: Paths = [],
          rootRoot = true;

        while(route.children.length) {
          route = route.firstChild;
          tmpUrl = `/${this.createUrl(route)}`;

          if(route.outlet !== PRIMARY_OUTLET || (!route.routeConfig.path && !rootRoot)) {
            continue;
          }

          rootRoot = false;

          if(route.params || route.data) {
            for(let key in route.params) {
              if(route.data['title']) {
                route.data['title'] = route.data['title'].replace(`:${key}`, route.params[key]);
              }
              if(route.data['breadcrumb']) {
                route.data['breadcrumb'] = route.data['breadcrumb'].replace(`:${key}`, route.params[key]);
              }
              if(route.data['description']) {
                route.data['description'] = route.data['description'].replace(`:${key}`, route.params[key]);
              }
            }
          }

          if(tmpUrl === '/') {
            paths.push(this.createBreadcrumb(route, tmpUrl));
          } else {
            url += tmpUrl;
            paths.push(this.createBreadcrumb(route, url));
          }
        }

        this.onChange.next(paths);
      }
    });
  }

  /**
   * [createBreadcrumb description]
   * @method createBreadcrumb
   * @param  {ActivatedRouteSnapshot} route [description]
   * @param  {string}                 url   [description]
   * @return {Breadcrumb}                   [description]
   */
  private createBreadcrumb(route: ActivatedRouteSnapshot, url: string): Path {
    if(route.children.length !== 0 && route.firstChild.routeConfig.path) {
      var isUrl = true;
      if(url !== '/' && !route.routeConfig.loadChildren && !route.routeConfig.component) {
        isUrl = false;
      }
    }

    return {
      data: route.data,
      params : route.params,
      url: isUrl ? url : null
    }
  }

  /**
   * [createUrl description]
   * @method createUrl
   * @param  {ActivatedRouteSnapshot} route [description]
   * @return {string}                       [description]
   */
  private createUrl(route: ActivatedRouteSnapshot): string {
    return route.url.map(urlSegment => urlSegment.toString()).join('/');
  }
}
