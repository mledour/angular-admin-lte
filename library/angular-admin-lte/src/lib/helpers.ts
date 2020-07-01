import { Subscription } from 'rxjs';


/**
 * [throttle description]
 * @method throttle
 * @param callback [description]
 * @param delay    [description]
 * @return [description]
 */
export function throttle(callback: () => void, delay: number): (args: Array<any>) => void {
  let timeout = null;
  return (...args) => {
    if (!timeout) {
      timeout = setTimeout(() => {
        callback.call(this, ...args);
        timeout = null;
      }, delay);
    }
  };
}


/**
 * [removeSubscriptions description]
 * @method removeSubscriptions
 */
export function removeSubscriptions(subscriptions): Array<Subscription> {
  if (subscriptions) {
    subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }
  return [];
}

/**
 * [removeListeners description]
 * @method removeListeners
 */
export function removeListeners(listeners): Array<() => void> {
  if (listeners) {
    listeners.forEach((listener: () => void) => {
      listener();
    });
  }
  return [];
}
