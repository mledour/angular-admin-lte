import { BehaviorSubject ,  Observable } from 'rxjs';
import { distinctUntilChanged, pluck } from 'rxjs/operators';

import { LayoutState } from './layout.state';

/*
 *
 */
export class LayoutStore {
  public readonly layoutState: Observable<LayoutState>;

  private _layoutState: BehaviorSubject<LayoutState>;
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
    this._layoutState = new BehaviorSubject(this.initialLayoutState);
    this.layoutState = this._layoutState.asObservable();
  }

  /**
   * [windowInnerHeight description]
   * @method windowInnerHeight
   * @return [description]
   */
  get windowInnerHeight(): Observable<number> {
    return <Observable<number>>this.layoutState.pipe(pluck('windowInnerHeight'), distinctUntilChanged());
  }

  /**
   * [windowInnerWidth description]
   * @method windowInnerWidth
   * @return [description]
   */
  get windowInnerWidth(): Observable<number> {
    return <Observable<number>>this.layoutState.pipe(pluck('windowInnerWidth'), distinctUntilChanged());
  }

  /**
   * [isSidebarLeftCollapsed description]
   * @return [description]
   */
  get isSidebarLeftCollapsed(): Observable<boolean> {
    return <Observable<boolean>>this.layoutState.pipe(pluck('isSidebarLeftCollapsed'), distinctUntilChanged());
  }

  /**
   * [isSidebarLeftExpandOnOver description]
   * @method isSidebarLeftExpandOnOver
   * @return [description]
   */
  get isSidebarLeftExpandOnOver(): Observable<boolean> {
    return <Observable<boolean>>this.layoutState.pipe(pluck('isSidebarLeftExpandOnOver'), distinctUntilChanged());
  }

  /**
   * [isSidebarLeftMouseOver description]
   * @method isSidebarLeftMouseOver
   * @return [description]
   */
  get isSidebarLeftMouseOver(): Observable<boolean> {
    return <Observable<boolean>>this.layoutState.pipe(pluck('isSidebarLeftMouseOver'), distinctUntilChanged());
  }

  /**
   * [isSidebarLeftMini description]
   * @method isSidebarLeftMini
   * @return [description]
   */
  get isSidebarLeftMini(): Observable<boolean> {
    return <Observable<boolean>>this.layoutState.pipe(pluck('isSidebarLeftMini'), distinctUntilChanged());
  }

  /**
   * [sidebarRightSkin description]
   * @method sidebarRightSkin
   * @return [description]
   */
  get sidebarRightSkin(): Observable<string> {
    return <Observable<string>>this.layoutState.pipe(pluck('sidebarRightSkin'), distinctUntilChanged());
  }

  /**
   * [isSidebarRightCollapsed description]
   * @return [description]
   */
  get isSidebarRightCollapsed(): Observable<boolean> {
    return <Observable<boolean>>this.layoutState.pipe(pluck('isSidebarRightCollapsed'), distinctUntilChanged());
  }

  /**
   * [isSidebarRightOverContent description]
   * @method isSidebarRightOverContent
   * @return [description]
   */
  get isSidebarRightOverContent(): Observable<boolean> {
    return <Observable<boolean>>this.layoutState.pipe(pluck('isSidebarRightOverContent'), distinctUntilChanged());
  }

  /**
   * [sidebarLeftMenu description]
   * @method sidebarLeftMenu
   * @return [description]
   */
  get sidebarLeftMenu(): Observable<Array<any>> {
    return <Observable<Array<any>>>this.layoutState.pipe(pluck('sidebarLeftMenu'), distinctUntilChanged());
  }

  /**
   * [sidebarLeftMenuActiveUrl description]
   * @method sidebarLeftMenuActiveUrl
   * @return [description]
   */
  get sidebarLeftMenuActiveUrl(): Observable<string> {
    return <Observable<string>>this.layoutState.pipe(pluck('sidebarLeftMenuActiveUrl'), distinctUntilChanged());
  }

  /**
   * [sidebarLeftElementHeight description]
   * @method sidebarLeftElementHeight
   * @return [description]
   */
  get sidebarLeftElementHeight(): Observable<number> {
    return <Observable<number>>this.layoutState.pipe(pluck('sidebarLeftElementHeight'), distinctUntilChanged());
  }

  /**
   * [layoutType description]
   * @method layoutType
   * @return [description]
   */
  get layout(): Observable<string> {
    return <Observable<string>>this.layoutState.pipe(pluck('layout'), distinctUntilChanged());
  }

  /**
   * [skin description]
   * @method skin
   * @return [description]
   */
  get skin(): Observable<string> {
    return <Observable<string>>this.layoutState.pipe(pluck('skin'), distinctUntilChanged());
  }

  /**
   * [wrapperClasses description]
   * @method wrapperClasses
   * @return [description]
   */
  get wrapperClasses(): Observable<string> {
    return <Observable<string>>this.layoutState.pipe(pluck('wrapperClasses'), distinctUntilChanged());
  }

  /**
   * [sidebarLeftCollapsed description]
   * @method sidebarLeftCollapsed
   * @param value [description]
   */
  public sidebarLeftCollapsed(value?: boolean): void {
    this._layoutState.next(
      Object.assign(this._layoutState.value, {isSidebarLeftCollapsed: value})
    );
  }

  /**
   * [sidebarLeftExpandOnOver description]
   * @method sidebarLeftExpandOnOver
   * @param value [description]
   */
  public sidebarLeftExpandOnOver(value?: boolean): void {
    this._layoutState.next(
      Object.assign(this._layoutState.value, {isSidebarLeftExpandOnOver: value})
    );
  }

  /**
   * [setSidebarLeftElementHeight description]
   * @method setSidebarLeftElementHeight
   * @param value [description]
   */
  public setSidebarLeftElementHeight(value: number): void {
    this._layoutState.next(
      Object.assign(this._layoutState.value, {sidebarLeftElementHeight: value})
    );
  }

  /**
   * [setSidebarRightSkin description]
   * @method setSidebarRightSkin
   * @param value [description]
   */
  public setSidebarRightSkin(value?: string): void {
    this._layoutState.next(
      Object.assign(this._layoutState.value, {sidebarRightSkin: value})
    );
  }

  /**
   * [sidebarLeftMouseOver description]
   * @method sidebarLeftMouseOver
   * @param value [description]
   */
  public sidebarLeftMouseOver(value?: boolean): void {
    this._layoutState.next(
      Object.assign(this._layoutState.value, {isSidebarLeftMouseOver: value})
    );
  }

  /**
   * [sidebarLeftMini description]
   * @method sidebarLeftMini
   * @param value [description]
   */
  public sidebarLeftMini(value?: boolean): void {
    this._layoutState.next(
      Object.assign(this._layoutState.value, {isSidebarLeftMini: value})
    );
  }

  /**
   * [sidebarRightCollapsed description]
   * @method sidebarRightCollapsed
   * @param value [description]
   */
  public sidebarRightCollapsed(value?: boolean): void {
    this._layoutState.next(
      Object.assign(this._layoutState.value, {isSidebarRightCollapsed: value})
    );
  }

  /**
   * [sidebarRightOverContent description]
   * @method sidebarRightOverContent
   * @param value [description]
   */
  public sidebarRightOverContent(value?: boolean): void {
    this._layoutState.next(
      Object.assign(this._layoutState.value, {isSidebarRightOverContent: value})
    );
  }

  /**
   * [setSidebarLeftMenu description]
   * @method setSidebarLeftMenu
   * @param value [description]
   */
  public setSidebarLeftMenu(value: Array<any>): void {
    this._layoutState.next(
      Object.assign(this._layoutState.value, {sidebarLeftMenu: value})
    );
  }

  /**
   * [setSidebarLeftMenuActiveUrl description]
   * @method setSidebarLeftMenuActiveUrl
   * @param value [description]
   */
  public setSidebarLeftMenuActiveUrl(value: string): void {
    this._layoutState.next(
      Object.assign(this._layoutState.value, {sidebarLeftMenuActiveUrl: value})
    );
  }

  /**
   * [setLayout description]
   * @method setLayout
   * @param value [description]
   */
  public setLayout(value: string): void {
    this._layoutState.next(
      Object.assign(this._layoutState.value, {layout: value})
    );
  }

  /**
   * [setSkin description]
   * @method setSkin
   * @param value [description]
   */
  public setSkin(value: string): void {
    this._layoutState.next(
      Object.assign(this._layoutState.value, {skin: value})
    );
  }

  /**
   * [setWrapperClasses description]
   * @method setWrapperClasses
   * @param value [description]
   */
  public setWrapperClasses(value: string): void {
    this._layoutState.next(
      Object.assign(this._layoutState.value, {wrapperClasses: value})
    );
  }

  /**
   * [setWindowInnerHeight description]
   * @method setWindowInnerHeight
   * @param value [description]
   */
  public setWindowInnerHeight(value: number): void {
    this._layoutState.next(
      Object.assign(this._layoutState.value, {windowInnerHeight: value})
    );
  }

  /**
   * [setWindowInnerWidth description]
   * @method setWindowInnerWidth
   * @param value [description]
   */
  public setWindowInnerWidth(value: number): void {
    this._layoutState.next(
      Object.assign(this._layoutState.value, {windowInnerWidth: value})
    );
  }
}
