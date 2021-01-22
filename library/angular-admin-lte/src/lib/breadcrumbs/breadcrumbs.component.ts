import { Component, OnInit, Input, OnDestroy, ChangeDetectorRef } from '@angular/core';

import { Subscription } from 'rxjs';

import { Path, RoutingService } from '../services/routing.service';


export interface Breadcrumbs extends Path {
  data: {
    breadcrumbs?: string;
    title?: string
  };
}


@Component({
  selector: 'mk-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  @Input() public homeIcon = 'fa fa-home';

  public breadcrumbs?: Breadcrumbs [];

  private subscription?: Subscription;

  constructor(
    private routingService: RoutingService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subscription = this.routingService.onChange.subscribe(paths => {
      this.breadcrumbs = paths;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
