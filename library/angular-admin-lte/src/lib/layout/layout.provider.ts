import { InjectionToken, Provider } from '@angular/core';

import { LayoutStore } from './layout.store';
import { LayoutState, LayoutStateConf } from './layout.state';


export const LayoutConfigToken = new InjectionToken('layoutConfig');


export function layoutStoreFactory(layoutConfig: LayoutState): LayoutStore {
  return new LayoutStore(layoutConfig);
}


export function layoutProvider(layoutConfig: LayoutStateConf): Provider[] {
  return [{
      provide: LayoutStore,
      useFactory: layoutStoreFactory,
      deps: [LayoutConfigToken]
    }, {
      provide: LayoutConfigToken,
      useValue: layoutConfig
    }
  ];
}
