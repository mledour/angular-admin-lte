import { Subscription } from 'rxjs';


export function throttle(callback: () => void, delay: number): (args: Array<any>) => void {
  let timeout = 0;
  return (...args) => {
    if (!timeout) {
      timeout = setTimeout(() => {
        // @ts-ignore
        callback.call(this, ...args);
        timeout = 0;
      }, delay);
    }
  };
}


export function removeSubscriptions(subscriptions: Subscription[]): Subscription[] {
  if (subscriptions) {
    subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }
  return [];
}


export function removeListeners(listeners: (() => void)[] = []): (() => void)[] {
  if (listeners) {
    listeners.forEach((listener: () => void) => {
      listener();
    });
  }
  return [];
}
