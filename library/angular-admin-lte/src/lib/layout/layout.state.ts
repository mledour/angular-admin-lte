export interface LayoutStateConf {
  isSidebarLeftCollapsed?: boolean;
  isSidebarLeftExpandOnOver?: boolean;
  isSidebarLeftMouseOver?: boolean;
  isSidebarLeftMini?: boolean;
  sidebarRightSkin?: string;
  isSidebarRightCollapsed?: boolean;
  isSidebarRightOverContent?: boolean;
  layout?: string;
  sidebarLeftMenu?: Array<object>;
  sidebarLeftMenuActiveUrl?: string;
  skin?: string;
}


export class LayoutState implements LayoutStateConf {
  windowInnerHeight?: number;
  windowInnerWidth?: number;
  sidebarLeftElementHeight?: number;
  sidebarRightElementHeight?: number;

  isSidebarLeftCollapsed = false;
  isSidebarLeftExpandOnOver = false;
  isSidebarLeftMouseOver = false;
  isSidebarLeftMini = true;
  sidebarRightSkin = 'dark';
  isSidebarRightCollapsed = true;
  isSidebarRightOverContent = true;
  layout =  'normal';
  sidebarLeftMenu = [];
  sidebarLeftMenuActiveUrl = '';
  skin = 'blue';

  constructor(config: Partial<LayoutStateConf>) {
    Object.assign(this, config);
  }
}
