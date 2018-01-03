import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/pluck';

import { LayoutState } from './layout.state';

/*
 *
 */
export class LayoutStore {
  public readonly layoutState: Observable<LayoutState>;

  private _layoutState: BehaviorSubject<LayoutState>;
  private initialLayoutState: LayoutState = {
    isSidebarLeftCollapsed: false,
    isSidebarLeftExpandOnOver: false,
    isSidebarLeftMouseOver: false,
    isSidebarLeftMini: true,
    sidebarRightSkin: 'dark',
    isSidebarRightCollapsed: true,
    isSidebarRightOverContent: true,
    layout: 'normal',
    sidebarLeftMenu: [],
    skin: 'blue',
  };

  /**
   * @method constructor
   * @param  {LayoutState} layoutConfig [description]
   */
  constructor(layoutConfig: LayoutState) {
    if(layoutConfig) {
      this.initialLayoutState = Object.assign(this.initialLayoutState, layoutConfig)
    }
    this._layoutState = new BehaviorSubject(this.initialLayoutState);
    this.layoutState = this._layoutState.asObservable();
  }

  /**
   * [windowInnerHeight description]
   * @method windowInnerHeight
   * @return {Observable<number>} [description]
   */
  get windowInnerHeight(): Observable<number>{
    return <Observable<number>>this.layoutState.pluck('windowInnerHeight').distinctUntilChanged();
  }

  /**
   * [windowInnerWidth description]
   * @method windowInnerWidth
   * @return {Observable<number>} [description]
   */
  get windowInnerWidth(): Observable<number>{
    return <Observable<number>>this.layoutState.pluck('windowInnerWidth').distinctUntilChanged();
  }

  /**
   * [isSidebarLeftCollapsed description]
   * @return {Observable<boolean>} [description]
   */
  get isSidebarLeftCollapsed(): Observable<boolean> {
    return <Observable<boolean>>this.layoutState.pluck('isSidebarLeftCollapsed').distinctUntilChanged();
  }

  /**
   * [isSidebarLeftExpandOnOver description]
   * @method isSidebarLeftExpandOnOver
   * @return {Observable<boolean>}     [description]
   */
  get isSidebarLeftExpandOnOver(): Observable<boolean> {
    return <Observable<boolean>>this.layoutState.pluck('isSidebarLeftExpandOnOver').distinctUntilChanged();
  }

  /**
   * [isSidebarLeftMouseOver description]
   * @method isSidebarLeftMouseOver
   * @return {Observable<boolean>}  [description]
   */
  get isSidebarLeftMouseOver(): Observable<boolean> {
    return <Observable<boolean>>this.layoutState.pluck('isSidebarLeftMouseOver').distinctUntilChanged();
  }

  /**
   * [isSidebarLeftMini description]
   * @method isSidebarLeftMini
   * @return {Observable<boolean>} [description]
   */
  get isSidebarLeftMini(): Observable<boolean> {
    return <Observable<boolean>>this.layoutState.pluck('isSidebarLeftMini').distinctUntilChanged();
  }

  /**
   * [sidebarRightSkin description]
   * @method sidebarRightSkin
   * @return {Observable<string>} [description]
   */
  get sidebarRightSkin(): Observable<string> {
    return <Observable<string>>this.layoutState.pluck('sidebarRightSkin').distinctUntilChanged();
  }

  /**
   * [isSidebarRightCollapsed description]
   * @return {Observable<boolean>} [description]
   */
  get isSidebarRightCollapsed(): Observable<boolean> {
    return <Observable<boolean>>this.layoutState.pluck('isSidebarRightCollapsed').distinctUntilChanged();
  }

  /**
   * [isSidebarRightOverContent description]
   * @method isSidebarRightOverContent
   * @return {Observable<boolean>}     [description]
   */
  get isSidebarRightOverContent(): Observable<boolean> {
    return <Observable<boolean>>this.layoutState.pluck('isSidebarRightOverContent').distinctUntilChanged();
  }

  /**
   * [sidebarLeftMenu description]
   * @method sidebarLeftMenu
   * @return {Observable}    [description]
   */
  get sidebarLeftMenu(): Observable<Array<any>> {
    return <Observable<Array<any>>>this.layoutState.pluck('sidebarLeftMenu').distinctUntilChanged();
  }

  /**
   * [sidebarLeftElementHeight description]
   * @method sidebarLeftElementHeight
   * @return {Observable<boolean>}    [description]
   */
  get sidebarLeftElementHeight(): Observable<number> {
    return <Observable<number>>this.layoutState.pluck('sidebarLeftElementHeight').distinctUntilChanged();
  }

  /**
   * [layoutType description]
   * @method layoutType
   * @return {Observable<boolean>} [description]
   */
  get layout(): Observable<string> {
    return <Observable<string>>this.layoutState.pluck('layout').distinctUntilChanged();
  }

  /**
   * [skin description]
   * @method skin
   * @return {Observable<boolean>} [description]
   */
  get skin(): Observable<string> {
    return <Observable<string>>this.layoutState.pluck('skin').distinctUntilChanged();
  }

  /**
   * [wrapperClasses description]
   * @method wrapperClasses
   * @return {Observable<string>} [description]
   */
  get wrapperClasses(): Observable<string> {
    return <Observable<string>>this.layoutState.pluck('wrapperClasses').distinctUntilChanged();
  }

  /**
   * [sidebarLeftCollapsed description]
   * @method sidebarLeftCollapsed
   * @param  {boolean}            value [description]
   */
  public sidebarLeftCollapsed(value?: boolean): void {
    this._layoutState.next(
      Object.assign(this._layoutState.value, {isSidebarLeftCollapsed: value})
    );
  }

  /**
   * [sidebarLeftExpandOnOver description]
   * @method sidebarLeftExpandOnOver
   * @param  {boolean}               value [description]
   */
  public sidebarLeftExpandOnOver(value?: boolean): void {
    this._layoutState.next(
      Object.assign(this._layoutState.value, {isSidebarLeftExpandOnOver: value})
    );
  }

  /**
   * [setSidebarLeftElementHeight description]
   * @method setSidebarLeftElementHeight
   * @param  {number}                    value [description]
   */
  public setSidebarLeftElementHeight(value: number): void {
    this._layoutState.next(
      Object.assign(this._layoutState.value, {sidebarLeftElementHeight: value})
    );
  }

  /**
   * [setSidebarRightSkin description]
   * @method setSidebarRightSkin
   * @param  {string}            value [description]
   */
  public setSidebarRightSkin(value?: string): void {
    this._layoutState.next(
      Object.assign(this._layoutState.value, {sidebarRightSkin: value})
    );
  }

  /**
   * [sidebarLeftMouseOver description]
   * @method sidebarLeftMouseOver
   * @param  {boolean}            value [description]
   */
  public sidebarLeftMouseOver(value?: boolean): void {
    this._layoutState.next(
      Object.assign(this._layoutState.value, {isSidebarLeftMouseOver: value})
    );
  }

  /**
   * [sidebarLeftMini description]
   * @method sidebarLeftMini
   * @param  {boolean}       value [description]
   */
  public sidebarLeftMini(value?: boolean): void {
    this._layoutState.next(
      Object.assign(this._layoutState.value, {isSidebarLeftMini: value})
    );
  }

  /**
   * [sidebarRightCollapsed description]
   * @method sidebarRightCollapsed
   * @param  {boolean}             value [description]
   */
  public sidebarRightCollapsed(value?: boolean): void {
    this._layoutState.next(
      Object.assign(this._layoutState.value, {isSidebarRightCollapsed: value})
    );
  }

  /**
   * [sidebarRightOverContent description]
   * @method sidebarRightOverContent
   * @param  {boolean}               value [description]
   */
  public sidebarRightOverContent(value?: boolean): void {
    this._layoutState.next(
      Object.assign(this._layoutState.value, {isSidebarRightOverContent: value})
    );
  }

  /**
   * [setSidebarLeftMenu description]
   * @method setSidebarLeftMenu
   * @param  {string}           value [description]
   */
  public setSidebarLeftMenu(value: Array<any>): void {
    this._layoutState.next(
      Object.assign(this._layoutState.value, {sidebarLeftMenu: value})
    );
  }

  /**
   * [setLayout description]
   * @method setLayout
   * @param  {string}  value [description]
   */
  public setLayout(value: string): void {
    this._layoutState.next(
      Object.assign(this._layoutState.value, {layout: value})
    );
  }

  /**
   * [setSkin description]
   * @method setSkin
   * @param  {string} value [description]
   */
  public setSkin(value: string): void {
    this._layoutState.next(
      Object.assign(this._layoutState.value, {skin: value})
    );
  }

  /**
   * [setWrapperClasses description]
   * @method setWrapperClasses
   * @param  {string}          value [description]
   */
  public setWrapperClasses(value: string): void {
    this._layoutState.next(
      Object.assign(this._layoutState.value, {wrapperClasses: value})
    );
  }

  /**
   * [setWindowInnerHeight description]
   * @method setWindowInnerHeight
   * @param  {number}             value [description]
   */
  public setWindowInnerHeight(value: number): void {
    this._layoutState.next(
      Object.assign(this._layoutState.value, {windowInnerHeight: value})
    );
  }

  /**
   * [setWindowInnerWidth description]
   * @method setWindowInnerWidth
   * @param  {number}            value [description]
   */
  public setWindowInnerWidth(value: number): void {
    this._layoutState.next(
      Object.assign(this._layoutState.value, {windowInnerWidth: value})
    );
  }
}
