import dayjs from 'dayjs';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const StatusBarHeight = getStatusBarHeight(true);

export const getCalendarColumns = (now: dayjs.Dayjs) => {
  const start = dayjs(now).startOf('week');

  const columns = [];
  for (let i = 0; i < 35; i++) {
    const date = dayjs(start).add(i, 'day');
    columns.push(date);
  }

  return columns;
};

export const getWeekCalendarColumns = (now: dayjs.Dayjs) => {
  const start = dayjs(now).startOf('week');

  const columns = [];
  for (let i = 0; i < 7; i++) {
    const date = dayjs(start).add(i, 'day');
    columns.push(date);
  }

  return columns;
};

export const getDayText = (day: number) => {
  switch (day) {
    case 0: return '일';
    case 1: return '월';
    case 2: return '화';
    case 3: return '수';
    case 4: return '목';
    case 5: return '금';
    case 6: return '토';
    default: return '';
  }
};
