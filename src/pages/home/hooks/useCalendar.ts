import {useCallback, useState} from 'react';
import dayjs from 'dayjs';
import { useRecoilState } from 'recoil';

import { getWeekCalendarColumns, getCalendarColumns } from '../utils';
import { calendarState, weekCalendarState } from '../../../atoms/calendar';
import useTodayTodo from '../../../hooks/useTodayTodo.ts';

export const useCalendar = (): {
  selectedWeekDate: dayjs.Dayjs;
  subtractOneWeek: () => void;
  addOneWeek: () => void;
  onSelectWeekDate: (date: dayjs.Dayjs) => void;
  weekDates: dayjs.Dayjs[];
  datePickerModalVisible: boolean;
  onOpenDatePickerModal: () => void;
  onCloseDatePickerModal: () => void;
  selectedDate: dayjs.Dayjs;
  dates: dayjs.Dayjs[];
  subtractOneMonth: () => void;
  addOneMonth: () => void;
} => {
  const [{ selectedWeekDate, weekDates }, setWeekCalendarState] = useRecoilState(weekCalendarState);
  const [{ selectedDate, dates }, setCalendarState] = useRecoilState(calendarState);
  const [datePickerModalVisible, setDatePickerModalVisible] = useState(false);

  const subtractOneWeek = useCallback(() => {
    const newSelectedDate = dayjs(selectedWeekDate).subtract(1, 'week');
    setWeekCalendarState({
      selectedWeekDate: newSelectedDate,
      weekDates: getWeekCalendarColumns(newSelectedDate),
    });
  }, [selectedWeekDate, setWeekCalendarState]);

  const addOneWeek = useCallback(() => {
    const newSelectedDate = dayjs(selectedWeekDate).add(1, 'week');
    setWeekCalendarState({
      selectedWeekDate: newSelectedDate,
      weekDates: getWeekCalendarColumns(newSelectedDate),
    });
  }, [setWeekCalendarState, selectedWeekDate]);

  const onSelectWeekDate = useCallback((date: dayjs.Dayjs) => {
    setWeekCalendarState({
      selectedWeekDate: date,
      weekDates: getWeekCalendarColumns(date),
    });
    setDatePickerModalVisible(false);
  }, [ setWeekCalendarState]);

  const subtractOneMonth = useCallback(() => {
    const newSelectedDate = dayjs(selectedDate).subtract(1, 'week');
    setCalendarState({
      selectedDate: newSelectedDate,
      dates: getCalendarColumns(newSelectedDate),
    });
  }, [selectedDate, setCalendarState]);

  const addOneMonth = useCallback(() => {
    const newSelectedDate = dayjs(selectedDate).add(1, 'week');
    setCalendarState({
      selectedDate: newSelectedDate,
      dates: getCalendarColumns(newSelectedDate),
    });
  }, [setCalendarState, selectedDate]);

  const onOpenDatePickerModal = useCallback(() => {
    setDatePickerModalVisible(true);
    setCalendarState({
      selectedDate: selectedWeekDate,
      dates: getCalendarColumns(selectedWeekDate),
    });
  }, [selectedWeekDate, setCalendarState]);
  const onCloseDatePickerModal = useCallback(() => setDatePickerModalVisible(false), []);

  return {
    selectedWeekDate,
    subtractOneWeek,
    addOneWeek,
    onSelectWeekDate,
    weekDates,
    datePickerModalVisible,
    onOpenDatePickerModal,
    onCloseDatePickerModal,
    selectedDate,
    dates,
    subtractOneMonth,
    addOneMonth,
  };
};
