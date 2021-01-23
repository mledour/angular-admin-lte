import { BehaviorSubject ,  Observable } from 'rxjs';
import { distinctUntilChanged, pluck } from 'rxjs/operators';

import { LayoutState, LayoutStateConf } from './layout.state';


export class LayoutStore {
  public readonly layoutState: Observable<LayoutState>;

  private state: BehaviorSubject<LayoutState>;
  private readonly initialLayoutState: LayoutState;

  constructor(layoutConfig: LayoutStateConf) {
    this.initialLayoutState = new LayoutState(layoutConfig);
    this.state = new BehaviorSubject(this.initialLayoutState);
    this.layoutState = this.state.asObservable();
  }

  get windowInnerHeight(): Observable<number | undefined> {
    return this.layoutState.pipe(pluck('windowInnerHeight'), distinctUntilChanged());
  }

  get windowInnerWidth(): Observable<number | undefined> {
    return this.layoutState.pipe(pluck('windowInnerWidth'), distinctUntilChanged());
  }

  get isSidebarLeftCollapsed(): Observable<boolean> {
    return this.layoutState.pipe(pluck('isSidebarLeftCollapsed'), distinctUntilChanged());
  }

  get isSidebarLeftExpandOnOver(): Observable<boolean> {
    return this.layoutState.pipe(pluck('isSidebarLeftExpandOnOver'), distinctUntilChanged());
  }

  get isSidebarLeftMouseOver(): Observable<boolean> {
    return this.layoutState.pipe(pluck('isSidebarLeftMouseOver'), distinctUntilChanged());
  }

  get isSidebarLeftMini(): Observable<boolean> {
    return this.layoutState.pipe(pluck('isSidebarLeftMini'), distinctUntilChanged());
  }

  get sidebarRightSkin(): Observable<string> {
    return this.layoutState.pipe(pluck('sidebarRightSkin'), distinctUntilChanged());
  }

  get isSidebarRightCollapsed(): Observable<boolean> {
    return this.layoutState.pipe(pluck('isSidebarRightCollapsed'), distinctUntilChanged());
  }

  get isSidebarRightOverContent(): Observable<boolean> {
    return this.layoutState.pipe(pluck('isSidebarRightOverContent'), distinctUntilChanged());
  }

  get sidebarLeftMenu(): Observable<Array<any>> {
    return this.layoutState.pipe(pluck('sidebarLeftMenu'), distinctUntilChanged());
  }

  get sidebarLeftMenuActiveUrl(): Observable<string> {
    return this.layoutState.pipe(pluck('sidebarLeftMenuActiveUrl'), distinctUntilChanged());
  }

  get sidebarLeftElementHeight(): Observable<number | undefined> {
    return this.layoutState.pipe(pluck('sidebarLeftElementHeight'), distinctUntilChanged());
  }

  get layout(): Observable<string> {
    return this.layoutState.pipe(pluck('layout'), distinctUntilChanged());
  }

  get skin(): Observable<string> {
    return this.layoutState.pipe(pluck('skin'), distinctUntilChanged());
  }

  public sidebarLeftCollapsed(value?: boolean): void {
    this.state.next(
      Object.assign(this.state.value, {isSidebarLeftCollapsed: value})
    );
  }

  public sidebarLeftExpandOnOver(value?: boolean): void {
    this.state.next(
      Object.assign(this.state.value, {isSidebarLeftExpandOnOver: value})
    );
  }

  public setSidebarLeftElementHeight(value: number): void {
    this.state.next(
      Object.assign(this.state.value, {sidebarLeftElementHeight: value})
    );
  }

  public setSidebarRightSkin(value?: string): void {
    this.state.next(
      Object.assign(this.state.value, {sidebarRightSkin: value})
    );
  }

  public sidebarLeftMouseOver(value?: boolean): void {
    this.state.next(
      Object.assign(this.state.value, {isSidebarLeftMouseOver: value})
    );
  }

  public sidebarLeftMini(value?: boolean): void {
    this.state.next(
      Object.assign(this.state.value, {isSidebarLeftMini: value})
    );
  }

  public sidebarRightCollapsed(value?: boolean): void {
    this.state.next(
      Object.assign(this.state.value, {isSidebarRightCollapsed: value})
    );
  }

  public sidebarRightOverContent(value?: boolean): void {
    this.state.next(
      Object.assign(this.state.value, {isSidebarRightOverContent: value})
    );
  }

  public setSidebarLeftMenu(value: Array<any>): void {
    this.state.next(
      Object.assign(this.state.value, {sidebarLeftMenu: value})
    );
  }

  public setSidebarLeftMenuActiveUrl(value: string): void {
    this.state.next(
      Object.assign(this.state.value, {sidebarLeftMenuActiveUrl: value})
    );
  }

  public setLayout(value: string): void {
    this.state.next(
      Object.assign(this.state.value, {layout: value})
    );
  }

  public setSkin(value: string): void {
    this.state.next(
      Object.assign(this.state.value, {skin: value})
    );
  }

  public setWindowInnerHeight(value: number): void {
    this.state.next(
      Object.assign(this.state.value, {windowInnerHeight: value})
    );
  }

  public setWindowInnerWidth(value: number): void {
    this.state.next(
      Object.assign(this.state.value, {windowInnerWidth: value})
    );
  }
}
