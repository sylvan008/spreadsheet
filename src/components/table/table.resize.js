import {$} from '@core/helpers/DOMHelper';
import {throttle} from './table.helpers';

/**
 * @function
 * @param {DOMHelper} $root
 * @param {Event} event
 */
export default function($root, event) {
  const $resizer = $(event.target);
  const {resizeDirection} = $resizer.data;
  const $parent = $resizer.closest('[data-type="resizable"]');
  const elementIndex = $parent.data[`${resizeDirection}Index`];
  const elementRect = $parent.getCoord();

  const elementsToResize = $root
      .findAll(`[data-${resizeDirection}-index="${elementIndex}"]`);

  const resizeProps = getResizeProps(resizeDirection);
  let value;

  $resizer.css({
    opacity: 1,
    [resizeProps.reesizerLength]: '-5000px',
  });

  document.onmousemove = throttle((e) => {
    const delta = e[resizeProps.eventAxis] - elementRect[resizeProps.rectSide];
    value = elementRect[resizeProps.style] + delta;
    $resizer.css({
      [resizeProps.resizerMove]: `${-delta}px`,
    });
  }, 50);
  document.onmouseup = () => {
    document.onmousemove = null;
    document.onmouseup = null;

    elementsToResize.forEach(element => $(element).css({
      [resizeProps.style]: `${value}px`,
    }));

    $resizer.css({
      opacity: 0,
      [resizeProps.reesizerLength]: 0,
      [resizeProps.resizerMove]: 0,
    });
  };
}

function getResizeProps(coordinateLine) {
  const SIDE = {
    row: {
      rectSide: 'bottom',
      style: 'height',
      resizerMove: 'bottom',
      reesizerLength: 'right',
      eventAxis: 'pageY',
    },
    col: {
      rectSide: 'right',
      style: 'width',
      resizerMove: 'right',
      reesizerLength: 'bottom',
      eventAxis: 'pageX',
    },
  };
  return SIDE[coordinateLine];
}
