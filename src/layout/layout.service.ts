import { Injectable, EventEmitter, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { RoutingService } from '../routing.service';

@Injectable()
export class LayoutService {
  public isLayoutDisabled: BehaviorSubject<boolean> = new BehaviorSubject(true);

  private layoutDisabled: boolean;


  /**
   * @method constructor
   * @param  {RoutingService} private routingService [description]
   */
  constructor(
    private routingService: RoutingService
  ) {
    this.init();
  }

  /**
   * [init description]
   * @method init
   * @return {[type]} [description]
   */
  private init() {
    this.routingService.onChange.subscribe((value) => {
      if(value && value[value.length - 1]) {
        if(this.layoutDisabled === undefined || this.layoutDisabled !== value[value.length - 1].data['disableLayout']) {
          this.isLayoutDisabled.next(!!value[value.length - 1].data['disableLayout']);
        }
        this.layoutDisabled = value[value.length - 1].data['disableLayout'];
      }
    });
  }
}
