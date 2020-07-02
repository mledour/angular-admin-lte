import { BehaviorSubject ,  Observable } from 'rxjs';
import { distinctUntilChanged, pluck } from 'rxjs/operators';

import { LayoutState } from './layout.state';

/*
 *
 */
export class LayoutStore {
  public readonly layoutState: Observable<LayoutState>;

  private state: BehaviorSubject<LayoutState>;
  private readonly initialLayoutState: LayoutState = {
    isSidebarLeftCollapsed: false,
    isSidebarLeftExpandOnOver: false,
    isSidebarLeftMouseOver: false,
    isSidebarLeftMini: true,
    sidebarRightSkin: 'dark',
    isSidebarRightCollapsed: true,
    isSidebarRightOverContent: true,
    layout: 'normal',
    sidebarLeftMenu: [],
    sidebarLeftMenuActiveUrl: '',
    skin: 'blue'
  };

  /**
   * @method constructor
   * @param layoutConfig [description]
   */
  constructor(layoutConfig: LayoutState) {
    if (layoutConfig) {
      this.initialLayoutState = Object.assign(this.initialLayoutState, layoutConfig);
    }
    this.state = new BehaviorSubject(this.initialLayoutState);
    this.layoutState = this.state.asObservable();
  }

  /**
   * [windowInnerHeight description]
   * @method windowInnerHeight
   * @return [description]
   */
  get windowInnerHeight(): Observable<number> {
    return this.layoutState.pipe(pluck('windowInnerHeight'), distinctUntilChanged()) as Observable<number>;
  }

  /**
   * [windowInnerWidth description]
   * @method windowInnerWidth
   * @return [description]
   */
  get windowInnerWidth(): Observable<number> {
    return this.layoutState.pipe(pluck('windowInnerWidth'), distinctUntilChanged()) as Observable<number>;
  }

  /**
   * [isSidebarLeftCollapsed description]
   * @return [description]
   */
  get isSidebarLeftCollapsed(): Observable<boolean> {
    return this.layoutState.pipe(pluck('isSidebarLeftCollapsed'), distinctUntilChanged()) as Observable<boolean>;
  }

  /**
   * [isSidebarLeftExpandOnOver description]
   * @method isSidebarLeftExpandOnOver
   * @return [description]
   */
  get isSidebarLeftExpandOnOver(): Observable<boolean> {
    return this.layoutState.pipe(pluck('isSidebarLeftExpandOnOver'), distinctUntilChanged()) as Observable<boolean>;
  }

  /**
   * [isSidebarLeftMouseOver description]
   * @method isSidebarLeftMouseOver
   * @return [description]
   */
  get isSidebarLeftMouseOver(): Observable<boolean> {
    return this.layoutState.pipe(pluck('isSidebarLeftMouseOver'), distinctUntilChanged()) as Observable<boolean>;
  }

  /**
   * [isSidebarLeftMini description]
   * @method isSidebarLeftMini
   * @return [description]
   */
  get isSidebarLeftMini(): Observable<boolean> {
    return this.layoutState.pipe(pluck('isSidebarLeftMini'), distinctUntilChanged()) as Observable<boolean>;
  }

  /**
   * [sidebarRightSkin description]
   * @method sidebarRightSkin
   * @return [description]
   */
  get sidebarRightSkin(): Observable<string> {
    return this.layoutState.pipe(pluck('sidebarRightSkin'), distinctUntilChanged()) as Observable<string>;
  }

  /**
   * [isSidebarRightCollapsed description]
   * @return [description]
   */
  get isSidebarRightCollapsed(): Observable<boolean> {
    return this.layoutState.pipe(pluck('isSidebarRightCollapsed'), distinctUntilChanged()) as Observable<boolean>;
  }

  /**
   * [isSidebarRightOverContent description]
   * @method isSidebarRightOverContent
   * @return [description]
   */
  get isSidebarRightOverContent(): Observable<boolean> {
    return this.layoutState.pipe(pluck('isSidebarRightOverContent'), distinctUntilChanged()) as Observable<boolean>;
  }

  /**
   * [sidebarLeftMenu description]
   * @method sidebarLeftMenu
   * @return [description]
   */
  get sidebarLeftMenu(): Observable<Array<any>> {
    return this.layoutState.pipe(pluck('sidebarLeftMenu'), distinctUntilChanged()) as Observable<Array<any>>;
  }

  /**
   * [sidebarLeftMenuActiveUrl description]
   * @method sidebarLeftMenuActiveUrl
   * @return [description]
   */
  get sidebarLeftMenuActiveUrl(): Observable<string> {
    return this.layoutState.pipe(pluck('sidebarLeftMenuActiveUrl'), distinctUntilChanged()) as Observable<string>;
  }

  /**
   * [sidebarLeftElementHeight description]
   * @method sidebarLeftElementHeight
   * @return [description]
   */
  get sidebarLeftElementHeight(): Observable<number> {
    return this.layoutState.pipe(pluck('sidebarLeftElementHeight'), distinctUntilChanged()) as Observable<number>;
  }

  /**
   * [layoutType description]
   * @method layoutType
   * @return [description]
   */
  get layout(): Observable<string> {
    return this.layoutState.pipe(pluck('layout'), distinctUntilChanged()) as Observable<string>;
  }

  /**
   * [skin description]
   * @method skin
   * @return [description]
   */
  get skin(): Observable<string> {
    return this.layoutState.pipe(pluck('skin'), distinctUntilChanged()) as Observable<string>;
  }

  /**
   * [wrapperClasses description]
   * @method wrapperClasses
   * @return [description]
   */
  get wrapperClasses(): Observable<string> {
    return this.layoutState.pipe(pluck('wrapperClasses'), distinctUntilChanged()) as Observable<string>;
  }

  /**
   * [sidebarLeftCollapsed description]
   * @method sidebarLeftCollapsed
   * @param value [description]
   */
  public sidebarLeftCollapsed(value?: boolean): void {
    this.state.next(
      Object.assign(this.state.value, {isSidebarLeftCollapsed: value})
    );
  }

  /**
   * [sidebarLeftExpandOnOver description]
   * @method sidebarLeftExpandOnOver
   * @param value [description]
   */
  public sidebarLeftExpandOnOver(value?: boolean): void {
    this.state.next(
      Object.assign(this.state.value, {isSidebarLeftExpandOnOver: value})
    );
  }

  /**
   * [setSidebarLeftElementHeight description]
   * @method setSidebarLeftElementHeight
   * @param value [description]
   */
  public setSidebarLeftElementHeight(value: number): void {
    this.state.next(
      Object.assign(this.state.value, {sidebarLeftElementHeight: value})
    );
  }

  /**
   * [setSidebarRightSkin description]
   * @method setSidebarRightSkin
   * @param value [description]
   */
  public setSidebarRightSkin(value?: string): void {
    this.state.next(
      Object.assign(this.state.value, {sidebarRightSkin: value})
    );
  }

  /**
   * [sidebarLeftMouseOver description]
   * @method sidebarLeftMouseOver
   * @param value [description]
   */
  public sidebarLeftMouseOver(value?: boolean): void {
    this.state.next(
      Object.assign(this.state.value, {isSidebarLeftMouseOver: value})
    );
  }

  /**
   * [sidebarLeftMini description]
   * @method sidebarLeftMini
   * @param value [description]
   */
  public sidebarLeftMini(value?: boolean): void {
    this.state.next(
      Object.assign(this.state.value, {isSidebarLeftMini: value})
    );
  }

  /**
   * [sidebarRightCollapsed description]
   * @method sidebarRightCollapsed
   * @param value [description]
   */
  public sidebarRightCollapsed(value?: boolean): void {
    this.state.next(
      Object.assign(this.state.value, {isSidebarRightCollapsed: value})
    );
  }

  /**
   * [sidebarRightOverContent description]
   * @method sidebarRightOverContent
   * @param value [description]
   */
  public sidebarRightOverContent(value?: boolean): void {
    this.state.next(
      Object.assign(this.state.value, {isSidebarRightOverContent: value})
    );
  }

  /**
   * [setSidebarLeftMenu description]
   * @method setSidebarLeftMenu
   * @param value [description]
   */
  public setSidebarLeftMenu(value: Array<any>): void {
    this.state.next(
      Object.assign(this.state.value, {sidebarLeftMenu: value})
    );
  }

  /**
   * [setSidebarLeftMenuActiveUrl description]
   * @method setSidebarLeftMenuActiveUrl
   * @param value [description]
   */
  public setSidebarLeftMenuActiveUrl(value: string): void {
    this.state.next(
      Object.assign(this.state.value, {sidebarLeftMenuActiveUrl: value})
    );
  }

  /**
   * [setLayout description]
   * @method setLayout
   * @param value [description]
   */
  public setLayout(value: string): void {
    this.state.next(
      Object.assign(this.state.value, {layout: value})
    );
  }

  /**
   * [setSkin description]
   * @method setSkin
   * @param value [description]
   */
  public setSkin(value: string): void {
    this.state.next(
      Object.assign(this.state.value, {skin: value})
    );
  }

  /**
   * [setWrapperClasses description]
   * @method setWrapperClasses
   * @param value [description]
   */
  public setWrapperClasses(value: string): void {
    this.state.next(
      Object.assign(this.state.value, {wrapperClasses: value})
    );
  }

  /**
   * [setWindowInnerHeight description]
   * @method setWindowInnerHeight
   * @param value [description]
   */
  public setWindowInnerHeight(value: number): void {
    this.state.next(
      Object.assign(this.state.value, {windowInnerHeight: value})
    );
  }

  /**
   * [setWindowInnerWidth description]
   * @method setWindowInnerWidth
   * @param value [description]
   */
  public setWindowInnerWidth(value: number): void {
    this.state.next(
      Object.assign(this.state.value, {windowInnerWidth: value})
    );
  }
}
