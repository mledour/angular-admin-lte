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
