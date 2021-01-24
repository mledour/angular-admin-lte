import { Component, OnInit, Input, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';

import { Path, RoutingService } from '../services/routing.service';

export interface Breadcrumb extends Path {
  data: {
    breadcrumbs?: string;
    title?: string;
  };
}

/*
 *
 */
@Component({
  selector: 'mk-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  public breadcrumbs?: Breadcrumb[];

  private subscription!: Subscription;

  @Input() public homeIcon = 'fa fa-home';

  /**
   * @method constructor
   * @param routingService [description]
   * @param changeDetectorRef [description]
   */
  constructor(
    private routingService: RoutingService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  /**
   * @method ngOnInit
   */
  ngOnInit(): void {
    this.subscription = this.routingService.onChange.subscribe(paths => {
      this.breadcrumbs = paths;
    });
  }

  /**
   * @method ngOnDestroy
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
