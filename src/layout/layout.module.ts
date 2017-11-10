import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ContentModule } from './content/content.module';
import { FooterModule } from './footer/footer.module';
import { HeaderModule } from './header/header.module';
import { SidebarLeftModule } from './sidebar-left/sidebar-left.module';
import { SidebarRightModule } from './sidebar-right/sidebar-right.module';
import { WrapperModule } from './wrapper/wrapper.module';

import { LayoutStore } from './layout.store';
import { LayoutState } from './layout.state';
import { layoutProvider } from './layout.provider';

import { RoutingService } from '../routing.service';

import { WrapperService } from './wrapper/wrapper.service';

@NgModule({
  imports: [CommonModule, RouterModule],
  exports: [ContentModule, FooterModule, HeaderModule, SidebarLeftModule, SidebarRightModule, WrapperModule],
  providers: [RoutingService, WrapperService]
})
export class LayoutModule {

  /**
   * @method constructor
   * @param  {[type]}    @Optional( [description]
   */
  constructor(@Optional() @SkipSelf() parentModule: LayoutModule) {
    if(parentModule) {
      throw new Error('LayoutModule is already loaded. Import it in the AppModule only!');
    }
  }

  /**
   * [forRoot description]
   * @method forRoot
   * @param  {LayoutState}         layoutConfig [description]
   * @return {ModuleWithProviders}              [description]
   */
  static forRoot(layoutConfig: LayoutState): ModuleWithProviders {
    return {
      ngModule: LayoutModule,
      providers: layoutProvider(layoutConfig)
    }
  }
}
