import {range} from '@core/utils';
import {keysKeyboard} from '@core/keys';

const {
  TAB,
  ENTER,
  ARROW_UP,
  ARROW_RIGHT,
  ARROW_DOWN,
  ARROW_LEFT,
} = keysKeyboard;

export function shouldResize(event) {
  return Boolean(event.target.dataset.resizeDirection);
}

export function includesClass(event, className) {
  return Array.prototype.includes.call(
      event.target.classList, className
  );
}

export function isCell(event) {
  return event.target.dataset.type === 'cell';
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

export function matrix($current, $target) {
  const current = $current.dataId(true);
  const target = $target.dataId(true);

  const rowIds = range(current.row, target.row);
  const colIds = range(current.col, target.col);

  return rowIds.reduce((acc, row) => {
    colIds.forEach(col => acc.push(`${row}:${col}`));
    return acc;
  }, []);
}

export function nextSelector(key, {row, col}) {
  switch (key) {
    case TAB:
    case ARROW_RIGHT:
      col++;
      break;
    case ENTER:
    case ARROW_DOWN:
      row++;
      break;
    case ARROW_LEFT:
      col--;
      break;
    case ARROW_UP:
      row--;
      break;
  }

  const ifLessZero = value => value < 0 ? 0 : value;
  return `[data-id="${ifLessZero(row)}:${ifLessZero(col)}"]`;
}
