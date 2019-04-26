import moment from 'moment';

export const beforeAfter = (val: number, s: string): string =>
  val > 0 ? `za ${val} ${s}` : `${-val} ${s} temu`;

export const calculateDays = (date: moment.Moment, today: moment.Moment): number =>
  date.diff(today, 'days');

export const calculateWeeks = (date: moment.Moment, today: moment.Moment): { weeks: number; days: number } => {
  const diff = date.diff(today, 'days');

  return {
    weeks: diff / 7 >> 0,
    days: diff % 7,
  };
};

export const calculateMonths = (date: moment.Moment, today: moment.Moment): { months: number; days: number } => {
  const diff = date.diff(today, 'days');
  const dd = date.date();
  const nd = today.date();

  let diffDays = 0;
  if (diff < 0) {
    if (dd < nd) {
      diffDays = dd - nd;
    } else if (dd > nd) {
      diffDays = dd - nd - date.clone().endOf('month').date();
    }
  } else if (diff > 0) {
    if (dd < nd) {
      diffDays = dd - nd + today.clone().endOf('month').date();
    } else if (dd > nd) {
      diffDays = dd - nd;
    }
  }

  return {
    months: date.diff(today, 'months'),
    days: diffDays,
  };
};