export function shouldResize(event) {
  return Boolean(event.target.dataset.resizeDirection);
}

export function throttle(fn, time) {
  let isThrottled = false;
  let savedArgs;
  let savedThis;

  function wrapper(...args) {
    if (isThrottled) {
      savedArgs = args;
      // eslint-disable-next-line no-invalid-this
      savedThis = this;
      return;
    }
    // eslint-disable-next-line no-invalid-this
    fn.apply(this, args);
    isThrottled = true;

    setTimeout(function() {
      isThrottled = false;
      if (savedArgs) {
        fn.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, time);
  }

  return wrapper;
}
