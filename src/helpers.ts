import { Subscriber } from 'rxjs/Subscriber';


/**
 * [throttle description]
 * @method throttle
 * @param  {Function} callback [description]
 * @param  {number}   delay    [description]
 * @return {Function}          [description]
 */
export function throttle(callback: Function, delay: number): (args: Array<any>) => void {
  let timeout = null;
  return (...args) => {
    if(!timeout) {
      timeout = setTimeout(() => {
        callback.call(this, ...args);
        timeout = null;
      }, delay);
    }
  }
}


/**
 * [removeSubscriptions description]
 * @method removeSubscriptions
 */
export function removeSubscriptions(subscriptions): Array<null> {
  if(subscriptions) {
    subscriptions.forEach((subscription: Subscriber<any>) => {
      subscription.unsubscribe();
    });
  }
  return [];
}

/**
 * [removeListeners description]
 * @method removeListeners
 */
export function removeListeners(listeners): Array<null> {
  if(listeners) {
    listeners.forEach((listener: Function) => {
      listener();
    });
  }
  return [];
}
