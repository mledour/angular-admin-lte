export interface LayoutState {
  isSidebarLeftCollapsed?: boolean;
  isSidebarLeftExpandOnOver?: boolean;
  isSidebarLeftMouseOver?: boolean;
  isSidebarLeftMini?: boolean;
  sidebarRightSkin?: string;
  isSidebarRightCollapsed?: boolean;
  isSidebarRightOverContent?: boolean;
  layout?: string;
  sidebarLeftElementHeight?: number;
  sidebarRightElementHeight?: number;
  sidebarLeftMenu?: Array<Object>;
  sidebarLeftMenuActiveUrl?: string;
  skin?: string;
  windowInnerHeight?: number;
  windowInnerWidth?: number;
}
