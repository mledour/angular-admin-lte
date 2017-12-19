import { Component, OnInit, Input, OnDestroy, ChangeDetectorRef } from "@angular/core";
import { Subscription } from 'rxjs/Subscription';

import { RoutingService } from '../routing.service';

/*
 *
 */
@Component({
  selector: 'mk-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  public breadcrumbs;

  private subscription: Subscription;

  @Input() public homeIcon = 'fa fa-home';

  /**
   * @method constructor
   * @param  {RoutingService} private routingService [description]
   */
  constructor(
    private routingService: RoutingService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  /**
   * @method ngOnInit
   */
  ngOnInit() {
    this.subscription = this.routingService.onChange.subscribe(value => {
      this.breadcrumbs = value;
    });
  }

  /**
   * @method ngOnDestroy
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
