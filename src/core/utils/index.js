export function capitalize(eventName) {
  if (typeof eventName !== 'string') {
    return '';
  }
  return eventName.charAt(0).toUpperCase() + eventName.slice(1);
}
