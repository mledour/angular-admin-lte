import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { RoutingService } from '../services/routing.service';
import { ActivatedRoute, ActivationStart, Router, RouterEvent } from '@angular/router';

@Injectable()
export class LayoutService {
  public isCustomLayout: BehaviorSubject<boolean> = new BehaviorSubject(true);

  private customLayout: boolean;


  /**
   * @method constructor
   * @param routingService [description]
   */
  constructor(
    private router: Router
  ) {
    this.init();
  }

  /**
   * [init description]
   * @method init
   * @return [description]
   */
  private init() {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof ActivationStart) {
        this.customLayout = event.snapshot.data.customLayout;
        this.isCustomLayout.next(!!this.customLayout);
      }
    });
  }
}
