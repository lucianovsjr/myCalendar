export default (date) => {
  const hours = date.getHours();

  if (hours >= 0 && hours < 6) {
    return 'dawn';
  }

  if (hours >= 6 && hours < 12) {
    return 'morning';
  }

  if (hours >= 12 && hours < 18) {
    return 'afternoon';
  }

  if (hours >= 18) {
    return 'night';
  }

  return '';
};
