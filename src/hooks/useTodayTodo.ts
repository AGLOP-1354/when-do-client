import { useCallback } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import dayjs from 'dayjs';
import { useMutation, useQuery } from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { TodayTodo, todayTodoListAtom } from '../atoms/todayTodo.ts';
import useFetch from './useFetch.ts';
import { weekCalendarState } from '../atoms/calendar.ts';

type UpdateTodayTodoParams = {
  id: string;
  title?: string;
  isAlarm?: boolean;
  alarmTime?: Date;
  isCompleted?: boolean;
  startDate?: Date;
  goalId?: string;
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
  const { selectedWeekDate } = useRecoilValue(weekCalendarState);
  const setTodayTodoList = useSetRecoilState(todayTodoListAtom);

  const { kyFetchWithUserId } = useFetch();

  const {
    data: todayTodoListFromDatabase = [],
    refetch: refetchTodayTodoList,
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

  const updateTodayTodo = useMutation({
    mutationFn: async ({
      id,
      title,
      isAlarm,
      alarmTime,
      isCompleted,
      goalId,
    }: UpdateTodayTodoParams) => {
      try {
        const result = await kyFetchWithUserId({
          method: 'POST',
          url: '/today-todo/update',
          data: {
            id,
            title,
            isAlarm,
            alarmTime,
            isCompleted,
            goalId,
          }
        });

        return result;
      } catch (error) {
        console.error(error);
      }
    },
    onSuccess: async () => {
      await refetchTodayTodoList();
    }
  });

  const deleteTodayTodo = useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      try {
        const result = await kyFetchWithUserId({
          method: 'POST',
          url: '/today-todo/delete',
          data: {
            id,
          }
        });

        return result;
      } catch (error) {
        console.error(error);
      }
    },
    onSuccess: async () => {
      await refetchTodayTodoList();
    }
  });

  const setTodayTodoBySelectedDate = useCallback((date: dayjs.Dayjs, tempTodayTodo: TodayTodo[]) => {
    setTodayTodoList(tempTodayTodo.filter(({ startDate }) => (
      dayjs(startDate).isSame(date, 'day')
    )));
  }, [setTodayTodoList]);

  return {
    addTodayTodo,
    setTodayTodoBySelectedDate,
    todayTodoListFromDatabase,
    isFetchTodayTodoListLoading,
    updateTodayTodo,
    deleteTodayTodo,
  };
};

export default useTodayTodo;
