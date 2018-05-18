import { InjectionToken } from '@angular/core';

import { LayoutStore } from './layout.store';
import { LayoutState } from './layout.state';

/**
 * [InjectionToken description]
 */
export const LayoutConfigToken = new InjectionToken('layoutConfig');

/**
 * [layoutStoreFactory description]
 */
export function layoutStoreFactory(layoutConfig: LayoutState): LayoutStore {
  return new LayoutStore(layoutConfig);
}

/**
 * [layoutProviders description]
 */
export function layoutProvider(layoutConfig: LayoutState) {
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
