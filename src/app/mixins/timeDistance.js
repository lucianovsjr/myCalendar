import { formatDistanceStrict } from 'date-fns';
import pt from 'date-fns/locale/pt';

export default (date, baseDate) => {
  const timeDistance = formatDistanceStrict(date, baseDate, {
    addSuffix: false,
    unit: 'day',
    locale: pt,
  });

  if (timeDistance === '0 dias') {
    return 'HOJE';
  }

  if (timeDistance === '1 dia') {
    return 'AMANHA';
  }

  return `Há ${timeDistance.toUpperCase()}`;
};
