import { atom } from 'recoil';
import dayjs from 'dayjs';
import { getCalendarColumns, getWeekCalendarColumns } from '../pages/home/utils';

export const weekCalendarState = atom({
  key: 'weekCalendarState',
  default: {
    selectedWeekDate: dayjs(),
    weekDates: getWeekCalendarColumns(dayjs()),
  }
});

export const calendarState = atom({
  key: 'calendarState',
  default: {
    selectedDate: dayjs(),
    dates: getCalendarColumns(dayjs()),
  }
});
