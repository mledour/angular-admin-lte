import { Injectable } from '@angular/core';
import { ActivationStart, Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';


@Injectable()
export class LayoutService {
  public isCustomLayout = new BehaviorSubject(false);

  private customLayout = false;

  constructor(
    private router: Router
  ) {
    this.init();
  }

  private init(): void {
    this.router.events.subscribe(event => {
      if (event instanceof ActivationStart) {
        this.customLayout = event.snapshot.data.customLayout;
        this.isCustomLayout.next(this.customLayout);
      }
    });
  }
}
