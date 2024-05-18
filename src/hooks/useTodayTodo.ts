import { useCallback } from 'react';
import { Alert } from 'react-native';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import dayjs from 'dayjs';

import { TodayTodo, todayTodoListAtom } from '../atoms/todayTodo.ts';
import useFetch from './useFetch.ts';
import { getItem, setItem } from '../context/utils/asyncStorage.ts';
import { useQuery } from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {  weekCalendarState } from '../atoms/calendar.ts';

type AddTodayTodoParams = TodayTodo & {
  onSuccessCallback?: () => void,
}
type TodayTodoListResponse = {
  data: {
    __v: number;
    _id: string;
    isAlarm: boolean,
    alarmTime?: Date;
    updatedAt: Date;
    createdAt: Date;
    startDate: Date;
    isCompleted?: boolean;
    title: string;
    userId: string;
    goalId?: string;
  }[];
}

const USER_ID = 'userId';

const useTodayTodo = () => {
  const todayTodoList = useRecoilValue(todayTodoListAtom);
  const { selectedWeekDate } = useRecoilValue(weekCalendarState);
  const setTodayTodoList = useSetRecoilState(todayTodoListAtom);

  const { kyFetchWithUserId } = useFetch();

  const {
    data: todayTodoListFromDatabase = [],
    isLoading: isFetchTodayTodoListLoading,
  } = useQuery({
    queryKey: ['today-todo-list', selectedWeekDate],
    queryFn: async () => {
      const asyncStoragePersonId = await AsyncStorage.getItem(USER_ID);
      if (!asyncStoragePersonId) {
        return {};
      }

      try {
        const result = await kyFetchWithUserId({
          method: 'GET',
          url: `/today-todo/${asyncStoragePersonId}/${String(selectedWeekDate)}`
        }) as TodayTodoListResponse;

        if (result && result.data) {
          const newTodayTodoList = result.data.map(({
            _id,
            startDate,
            isCompleted,
            title,
            alarmTime,
            isAlarm,
            goalId,
          }) => ({
            id: _id,
            title,
            isAlarm,
            alarmTime,
            isCompleted,
            startDate,
            goalId,
          }));
          setTodayTodoList(newTodayTodoList);
        }

        return result;
      } catch (error) {
        console.error(error);
      }
    }
  });

  const addTempTodayTodo = useCallback(async ({
    id,
    title,
    isAlarm,
    alarmTime,
    startDate,
    goalId,
    isCompleted,
    onSuccessCallback = () => {},
  }: AddTodayTodoParams) => {
    const newTodayTodo = [
      ...todayTodoList,
      {
        id,
        title,
        isAlarm,
        alarmTime,
        isCompleted,
        startDate,
        goalId,
      }
    ];
    if (newTodayTodo.length > 3) {
      Alert.alert('추가로 일정을 등록하려면 로그인 해주세요.');
      return;
    }

    setTodayTodoList(newTodayTodo);
    await setItem('tempTodayTodo', JSON.stringify(newTodayTodo));
    onSuccessCallback();
  }, [todayTodoList, setTodayTodoList]);

  const addTodayTodo = useCallback(async ({
    title,
    isAlarm,
    time,
    startDate,
    goalId,
    onSuccessCallback = () => {},
  }: {
    title: string,
    isAlarm: boolean,
    time?: Date,
    startDate: Date,
    goalId?: string,
    onSuccessCallback?: () => void,
}) => {
    if (!title) return;

    const result = await kyFetchWithUserId({
      method: 'POST',
      url: '/today-todo/add',
      data: {
        title,
        isAlarm,
        time,
        isCompleted: false,
        startDate: startDate,
        goalId,
      }
    }) as TodayTodo;

    setTodayTodoList(prev => ([
      ...prev,
      result,
    ]));
    onSuccessCallback();
  }, [kyFetchWithUserId, setTodayTodoList]);

  const setTodayTodoBySelectedDate = useCallback((date: dayjs.Dayjs, tempTodayTodo: TodayTodo[]) => {
    setTodayTodoList(tempTodayTodo.filter(({ startDate }) => (
      dayjs(startDate).isSame(date, 'day')
    )));
  }, [setTodayTodoList]);

  const initTempTodayTodo = useCallback(async (date: dayjs.Dayjs) => {
    const tempTodayTodo = await getItem('tempTodayTodo');
    if (!tempTodayTodo) return;

    const parsedTempTodayTodo = JSON.parse(tempTodayTodo) as TodayTodo[];
    setTodayTodoBySelectedDate(date, parsedTempTodayTodo);
  }, [setTodayTodoBySelectedDate]);

  return {
    addTodayTodo,
    addTempTodayTodo,
    setTodayTodoBySelectedDate,
    initTempTodayTodo,
    todayTodoListFromDatabase,
    isFetchTodayTodoListLoading,
  };
};

export default useTodayTodo;
